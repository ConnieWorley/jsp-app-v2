import { supabase } from "./supabase"

export async function getPreferences() {
  const { data, error } = await supabase
    .from("job_board_preferences")
    .select("*")
    .maybeSingle()
  return { data, error }
}

export async function upsertPreferences({ standard_boards, custom_boards }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("job_board_preferences")
    .upsert(
      {
        user_id: user.id,
        standard_boards,
        custom_boards,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single()
  return { data, error }
}
