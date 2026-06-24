import { useEffect, useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/AuthContext"
import {
  listStories,
  createStory,
  updateStory,
  deleteStory,
} from "@/lib/stories"

const emptyForm = {
  title: "",
  situation: "",
  task: "",
  action: "",
  result: "",
}

const STAR_FIELDS = [
  {
    key: "situation",
    label: "Situation",
    placeholder: "The context — where you were, what was happening.",
  },
  {
    key: "task",
    label: "Task",
    placeholder: "What needed to be done, or what you were responsible for.",
  },
  {
    key: "action",
    label: "Action",
    placeholder: 'What you specifically did. Use "I" not "we."',
  },
  {
    key: "result",
    label: "Result",
    placeholder:
      "What happened. Quantify when you can (numbers, percentages, time saved).",
  },
]

export function StorybankStep({ onValidityChange }) {
  const { storybankDeferredAt, deferStorybank } = useAuth()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deferring, setDeferring] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    listStories().then(({ data, error }) => {
      if (!active) return
      if (error) setError(error.message)
      else setStories(data)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    onValidityChange?.(stories.length > 0 || !!storybankDeferredAt)
  }, [stories.length, storybankDeferredAt, onValidityChange])

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setError("")
  }

  function startEdit(story) {
    setEditingId(story.id)
    setForm({
      title: story.title,
      situation: story.situation,
      task: story.task,
      action: story.action,
      result: story.result,
    })
    setError("")
  }

  async function handleDelete(id) {
    if (!confirm("Delete this story?")) return
    const { error } = await deleteStory(id)
    if (error) {
      setError(error.message)
      return
    }
    setStories((prev) => prev.filter((s) => s.id !== id))
    if (editingId === id) resetForm()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const payload = {
      title: form.title.trim(),
      situation: form.situation.trim(),
      task: form.task.trim(),
      action: form.action.trim(),
      result: form.result.trim(),
    }

    if (!payload.title) {
      setError("Give your story a short title so future-you can find it.")
      return
    }
    for (const f of STAR_FIELDS) {
      if (!payload[f.key]) {
        setError(`Your ${f.label} is looking empty — even a sentence or two helps.`)
        return
      }
    }

    setSaving(true)
    if (editingId) {
      const { data, error } = await updateStory(editingId, payload)
      setSaving(false)
      if (error) {
        setError(error.message)
        return
      }
      setStories((prev) => prev.map((s) => (s.id === editingId ? data : s)))
    } else {
      const { data, error } = await createStory(payload)
      setSaving(false)
      if (error) {
        setError(error.message)
        return
      }
      setStories((prev) => [...prev, data])
    }
    resetForm()
  }

  async function handleSkip() {
    setDeferring(true)
    const { error } = await deferStorybank()
    setDeferring(false)
    if (error) setError(error.message)
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your storybank…
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {stories.length === 0 && !editingId && (
        <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
          <p>
            STAR stories are little ammo packets for interviews. We recommend 5 or 6, but one is a great start. ✨
          </p>
        </div>
      )}

      {stories.length > 0 && (
        <ul className="space-y-3">
          {stories.map((s) => (
            <li
              key={s.id}
              className="rounded-lg border border-border bg-card p-4 flex items-start justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <p className="font-heading text-lg text-primary truncate">
                  {s.title}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {s.result}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => startEdit(s)}
                  aria-label="Edit"
                >
                  <Pencil />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(s.id)}
                  aria-label="Delete"
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-lg border border-border bg-card p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl text-primary">
            {editingId ? "Edit story" : "Add a story"}
          </h3>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
              <X />
              Cancel
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Led migration project under deadline"
            required
          />
        </div>

        {STAR_FIELDS.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label} *</Label>
            <Textarea
              id={f.key}
              value={form[f.key]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
              }
              placeholder={f.placeholder}
              rows={3}
            />
          </div>
        ))}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : editingId ? "Update story" : "Save story"}
        </Button>
      </form>

      {stories.length === 0 && !editingId && !storybankDeferredAt && (
        <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Not ready right now? You can come back to this later.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            disabled={deferring}
          >
            {deferring ? "Skipping…" : "Skip for now"}
          </Button>
        </div>
      )}

      {stories.length === 0 && !editingId && storybankDeferredAt && (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Skipped for now — you can come back anytime. Click <strong>Next</strong> to keep going. ✨
          </p>
        </div>
      )}
    </div>
  )
}
