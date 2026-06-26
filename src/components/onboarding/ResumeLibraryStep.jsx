import { useEffect, useRef, useState } from "react"
import { Download, Pencil, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  listResumes,
  uploadResume,
  renameResume,
  deleteResume,
  getResumeDownloadUrl,
} from "@/lib/resumes"

const MAX_RESUMES = 3
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function shortFileType(mimeType) {
  if (mimeType === "application/pdf") return "PDF"
  if (mimeType === "application/msword") return "DOC"
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "DOCX"
  }
  return "Resume"
}

export function ResumeLibraryStep({ onValidityChange }) {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editLabel, setEditLabel] = useState("")
  const [originalLabel, setOriginalLabel] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadLabel, setUploadLabel] = useState("")
  const [uploadFile, setUploadFile] = useState(null)
  const fileInputRef = useRef(null)

  const editIsDirty =
    editingId !== null && editLabel.trim() !== originalLabel

  useEffect(() => {
    let active = true
    listResumes().then(({ data, error }) => {
      if (!active) return
      if (error) setError(error.message)
      else setResumes(data ?? [])
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    onValidityChange?.(resumes.length >= 1 && !editIsDirty)
  }, [resumes.length, editIsDirty, onValidityChange])

  function startEdit(resume) {
    setEditingId(resume.id)
    setEditLabel(resume.label)
    setOriginalLabel(resume.label)
    setError("")
  }

  function cancelEdit() {
    setEditingId(null)
    setEditLabel("")
    setOriginalLabel("")
  }

  async function saveEdit(id) {
    const trimmed = editLabel.trim()
    if (!trimmed) {
      setError("Give the resume a label so future-you can find it.")
      return
    }
    setError("")
    const { data, error } = await renameResume(id, trimmed)
    if (error) {
      setError(error.message)
      return
    }
    setResumes((prev) => prev.map((r) => (r.id === id ? data : r)))
    cancelEdit()
  }

  async function handleDelete(resume) {
    if (!confirm(`Delete "${resume.label}"?`)) return
    setError("")
    const { error } = await deleteResume(resume.id, resume.storage_path)
    if (error) {
      setError(error.message)
      return
    }
    setResumes((prev) => prev.filter((r) => r.id !== resume.id))
    if (editingId === resume.id) cancelEdit()
  }

  async function handleDownload(resume) {
    setError("")
    const { url, error } = await getResumeDownloadUrl(resume.storage_path)
    if (error || !url) {
      setError(error?.message || "Could not generate download link.")
      return
    }
    window.open(url, "_blank", "noopener,noreferrer")
  }

  function handleFileChange(e) {
    setError("")
    const f = e.target.files?.[0]
    if (!f) {
      setUploadFile(null)
      return
    }
    if (!ALLOWED_MIME_TYPES.includes(f.type)) {
      setError("Only PDF or Word documents are allowed.")
      setUploadFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }
    if (f.size > MAX_FILE_SIZE_BYTES) {
      setError(
        `That file is too large — max ${formatFileSize(MAX_FILE_SIZE_BYTES)}.`,
      )
      setUploadFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }
    setUploadFile(f)
  }

  async function handleUpload(e) {
    e.preventDefault()
    setError("")
    if (!uploadFile) {
      setError("Pick a file to upload first.")
      return
    }
    if (!uploadLabel.trim()) {
      setError("Give the resume a label so future-you can find it.")
      return
    }
    setUploading(true)
    const { data, error } = await uploadResume({
      file: uploadFile,
      label: uploadLabel,
    })
    setUploading(false)
    if (error) {
      setError(error.message)
      return
    }
    setResumes((prev) => [...prev, data])
    setUploadLabel("")
    setUploadFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your resume library…
      </div>
    )
  }

  const slotsLeft = MAX_RESUMES - resumes.length

  return (
    <div className="space-y-6">
      {resumes.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
          <p>
            Upload up to {MAX_RESUMES} master resumes. We will pick the right one when tailoring per job. 📄
          </p>
        </div>
      )}

      {resumes.length > 0 && (
        <ul className="space-y-3">
          {resumes.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {editingId === r.id ? (
                    <div className="space-y-2">
                      <Label htmlFor={`edit-${r.id}`}>Label</Label>
                      <Input
                        id={`edit-${r.id}`}
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        placeholder="e.g. Operations"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => saveEdit(r.id)}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                      {editIsDirty && (
                        <p className="text-sm text-muted-foreground italic">
                          You have unsaved label changes — click Save to keep them, or Cancel to discard.
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="font-heading text-lg text-primary truncate">
                        {r.label}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {r.original_filename} · {shortFileType(r.mime_type)} ·{" "}
                        {formatFileSize(r.file_size_bytes)}
                      </p>
                    </>
                  )}
                </div>
                {editingId !== r.id && (
                  <div className="flex gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(r)}
                      aria-label="Download"
                    >
                      <Download />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(r)}
                      aria-label="Rename label"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(r)}
                      aria-label="Delete"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {resumes.length < MAX_RESUMES && (
        <form
          onSubmit={handleUpload}
          noValidate
          className="rounded-lg border border-border bg-card p-6 space-y-4"
        >
          <h3 className="font-heading text-xl text-primary">
            {resumes.length === 0 ? "Upload your first resume" : "Add another"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {resumes.length === 0
              ? "PDF or Word, up to 5 MB."
              : `You have ${resumes.length} of ${MAX_RESUMES}. ${slotsLeft} slot${slotsLeft === 1 ? "" : "s"} left.`}
          </p>

          <div className="space-y-2">
            <Label htmlFor="upload-label">Label *</Label>
            <Input
              id="upload-label"
              value={uploadLabel}
              onChange={(e) => setUploadLabel(e.target.value)}
              placeholder="e.g. Operations, Project Management"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-file">File *</Label>
            <Input
              id="upload-file"
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
            {uploadFile && (
              <p className="text-sm text-muted-foreground">
                {uploadFile.name} · {formatFileSize(uploadFile.size)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={uploading || !uploadFile || !uploadLabel.trim()}
          >
            {uploading ? (
              "Uploading…"
            ) : (
              <>
                <Upload />
                Upload resume
              </>
            )}
          </Button>
        </form>
      )}

      {resumes.length >= MAX_RESUMES && (
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
          You have all {MAX_RESUMES} resume slots filled. Delete one above if you need to swap.
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
