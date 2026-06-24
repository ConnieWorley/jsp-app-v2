import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSchedule, upsertSchedule } from "@/lib/followUpSchedule"

const DEFAULTS = {
  apply_offset_days: 1,
  outreach_offset_days: 2,
  first_followup_offset_days: 3,
  second_followup_offset_days: 7,
  third_followup_offset_days: 7,
}

const FIELDS = [
  {
    key: "apply_offset_days",
    label: "Tailor resume and apply",
    anchor: "Days after saving the job",
  },
  {
    key: "outreach_offset_days",
    label: "Start your reach-out plan",
    anchor: "Days after applying",
  },
  {
    key: "first_followup_offset_days",
    label: "1st follow-up",
    anchor: "Days after initial contact",
  },
  {
    key: "second_followup_offset_days",
    label: "2nd follow-up",
    anchor: "Days after 1st follow-up",
  },
  {
    key: "third_followup_offset_days",
    label: "3rd follow-up",
    anchor: "Days after 2nd follow-up",
  },
]

const emptyForm = Object.fromEntries(FIELDS.map((f) => [f.key, ""]))

export function FollowUpScheduleStep({ onValidityChange }) {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [hasSavedRow, setHasSavedRow] = useState(false)

  useEffect(() => {
    let active = true
    getSchedule().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setError(error.message)
      } else if (data) {
        setForm(
          Object.fromEntries(FIELDS.map((f) => [f.key, String(data[f.key])])),
        )
        setHasSavedRow(true)
      } else {
        setForm(
          Object.fromEntries(
            FIELDS.map((f) => [f.key, String(DEFAULTS[f.key])]),
          ),
        )
      }
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    onValidityChange?.(hasSavedRow)
  }, [hasSavedRow, onValidityChange])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const numbers = Object.fromEntries(
      FIELDS.map((f) => [f.key, Number(form[f.key])]),
    )

    if (!Object.values(numbers).every((n) => Number.isInteger(n) && n > 0)) {
      setError("Each offset needs to be a whole number greater than zero.")
      return
    }

    setSaving(true)
    const { error } = await upsertSchedule(numbers)
    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }
    setHasSavedRow(true)
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your follow-up schedule…
      </div>
    )
  }

  const applicationFields = FIELDS.slice(0, 2)
  const followupFields = FIELDS.slice(2)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="rounded-lg border border-dashed border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          When you save a job, when do you want to act? Set your default cadence here. You can always override the offsets on a per-job basis later. ⏰
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-heading text-xl text-primary">Application timeline</h3>
        <p className="text-sm text-muted-foreground">
          The two beats between saving a job and starting your outreach.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {applicationFields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                type="number"
                min="1"
                value={form[f.key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
              />
              <p className="text-xs text-muted-foreground">{f.anchor}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-heading text-xl text-primary">Outreach follow-ups</h3>
        <p className="text-sm text-muted-foreground">
          Three escalating nudges after your initial reach-out, so promising leads do not go cold.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {followupFields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                type="number"
                min="1"
                value={form[f.key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
              />
              <p className="text-xs text-muted-foreground">{f.anchor}</p>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : hasSavedRow ? "Update schedule" : "Save schedule"}
        </Button>
        {hasSavedRow && !error && !saving && (
          <p className="text-sm text-muted-foreground">
            Saved. You are good to continue.
          </p>
        )}
      </div>
    </form>
  )
}
