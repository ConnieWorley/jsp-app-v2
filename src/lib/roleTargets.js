import { supabase } from "./supabase"

export async function listRoleTargets() {
  const { data, error } = await supabase
    .from("role_targets")
    .select("*")
    .order("created_at", { ascending: true })
  return { data: data ?? [], error }
}

export async function createRoleTarget(target) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("role_targets")
    .insert({ ...target, user_id: user.id })
    .select()
    .single()
  return { data, error }
}

export async function updateRoleTarget(id, patch) {
  const { data, error } = await supabase
    .from("role_targets")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  return { data, error }
}

export async function deleteRoleTarget(id) {
  const { error } = await supabase.from("role_targets").delete().eq("id", id)
  return { error }
}
