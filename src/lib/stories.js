import { supabase } from "./supabase"

export async function listStories() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: true })
  return { data: data ?? [], error }
}

export async function createStory(story) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("stories")
    .insert({ ...story, user_id: user.id })
    .select()
    .single()
  return { data, error }
}

export async function updateStory(id, patch) {
  const { data, error } = await supabase
    .from("stories")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  return { data, error }
}

export async function deleteStory(id) {
  const { error } = await supabase.from("stories").delete().eq("id", id)
  return { error }
}
