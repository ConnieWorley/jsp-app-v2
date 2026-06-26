import { supabase } from "./supabase"

export async function getElevatorPitch() {
  const { data, error } = await supabase
    .from("elevator_pitch")
    .select("*")
    .maybeSingle()
  return { data, error }
}

export async function upsertElevatorPitch({ pitch, quiz_answers }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("elevator_pitch")
    .upsert(
      {
        user_id: user.id,
        pitch,
        quiz_answers,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single()
  return { data, error }
}

export async function deferElevatorPitch() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("elevator_pitch")
    .upsert(
      {
        user_id: user.id,
        deferred_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single()
  return { data, error }
}
