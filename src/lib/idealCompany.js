import { supabase } from "./supabase"

export async function getIdealCompany() {
  const { data, error } = await supabase
    .from("ideal_company")
    .select("*")
    .maybeSingle()
  return { data, error }
}

export async function upsertIdealCompany({
  size_standard,
  industry_standard,
  industry_custom,
  culture_standard,
  culture_custom,
  values_standard,
  values_custom,
  dealbreakers,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { data: null, error: new Error("Not signed in") }

  const { data, error } = await supabase
    .from("ideal_company")
    .upsert(
      {
        user_id: user.id,
        size_standard,
        industry_standard,
        industry_custom,
        culture_standard,
        culture_custom,
        values_standard,
        values_custom,
        dealbreakers,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single()
  return { data, error }
}
