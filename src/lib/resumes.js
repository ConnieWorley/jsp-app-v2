import { supabase } from "./supabase"

const BUCKET = "resumes"

export async function listResumes() {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: true })
  return { data, error }
}

export async function uploadResume({ file, label }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const dotIdx = file.name.lastIndexOf(".")
  const ext = dotIdx >= 0 ? file.name.slice(dotIdx + 1).toLowerCase() : "bin"
  const objectId = crypto.randomUUID()
  const storagePath = `${user.id}/${objectId}.${ext}`

  const uploadRes = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    })
  if (uploadRes.error) {
    return { data: null, error: uploadRes.error }
  }

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: user.id,
      label: label.trim(),
      original_filename: file.name,
      storage_path: storagePath,
      file_size_bytes: file.size,
      mime_type: file.type,
    })
    .select()
    .single()

  if (error) {
    // Orphan cleanup: undo the Storage upload if the DB insert failed.
    await supabase.storage.from(BUCKET).remove([storagePath])
    return { data: null, error }
  }

  return { data, error: null }
}

export async function renameResume(id, newLabel) {
  const { data, error } = await supabase
    .from("resumes")
    .update({
      label: newLabel.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()
  return { data, error }
}

export async function deleteResume(id, storagePath) {
  const { error: dbError } = await supabase
    .from("resumes")
    .delete()
    .eq("id", id)
  if (dbError) return { error: dbError }

  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([storagePath])
  if (storageError) {
    console.warn("Storage object delete failed (orphan):", storageError)
  }
  return { error: null }
}

export async function getResumeDownloadUrl(storagePath, expiresInSeconds = 60) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, expiresInSeconds)
  return { url: data?.signedUrl ?? null, error }
}
