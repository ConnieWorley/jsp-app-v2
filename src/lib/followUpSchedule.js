import { supabase } from "./supabase"

export async function getSchedule() {
  const { data, error } = await supabase
    .from("follow_up_schedule")
    .select("*")
    .maybeSingle()
  return { data, error }
}

export async function upsertSchedule({
  apply_offset_days,
  outreach_offset_days,
  first_followup_offset_days,
  second_followup_offset_days,
  third_followup_offset_days,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("follow_up_schedule")
    .upsert(
      {
        user_id: user.id,
        apply_offset_days,
        outreach_offset_days,
        first_followup_offset_days,
        second_followup_offset_days,
        third_followup_offset_days,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single()
  return { data, error }
}
