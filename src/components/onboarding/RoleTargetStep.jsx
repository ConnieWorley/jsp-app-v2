import { useEffect, useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  listRoleTargets,
  createRoleTarget,
  updateRoleTarget,
  deleteRoleTarget,
} from "@/lib/roleTargets"

const LOCATION_MODES = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
]

const emptyForm = {
  job_title: "",
  salary_min: "",
  salary_target: "",
  location_modes: [],
  locations: "",
}

function formatSalaryRange(target) {
  const { salary_min, salary_target, salary_currency } = target
  if (!salary_min && !salary_target) return null
  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: salary_currency || "USD",
      maximumFractionDigits: 0,
    }).format(n)
  if (salary_min && salary_target) return `${fmt(salary_min)} – ${fmt(salary_target)}`
  if (salary_target) return `Target: ${fmt(salary_target)}`
  return `Min: ${fmt(salary_min)}`
}

export function RoleTargetStep({ onValidityChange }) {
  const [targets, setTargets] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    listRoleTargets().then(({ data, error }) => {
      if (!active) return
      if (error) setError(error.message)
      else setTargets(data)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    onValidityChange?.(targets.length > 0)
  }, [targets.length, onValidityChange])

  function toggleMode(value) {
    setForm((f) => ({
      ...f,
      location_modes: f.location_modes.includes(value)
        ? f.location_modes.filter((m) => m !== value)
        : [...f.location_modes, value],
    }))
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setError("")
  }

  function startEdit(target) {
    setEditingId(target.id)
    setForm({
      job_title: target.job_title,
      salary_min: target.salary_min ?? "",
      salary_target: target.salary_target ?? "",
      location_modes: target.location_modes ?? [],
      locations: (target.locations ?? []).join(", "),
    })
    setError("")
  }

  async function handleDelete(id) {
    if (!confirm("Delete this role target?")) return
    const { error } = await deleteRoleTarget(id)
    if (error) {
      setError(error.message)
      return
    }
    setTargets((prev) => prev.filter((t) => t.id !== id))
    if (editingId === id) resetForm()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const title = form.job_title.trim()
    if (!title) {
      setError("Job title is required.")
      return
    }
    if (form.location_modes.length === 0) {
      setError("Pick at least one location mode (Remote, Hybrid, or Onsite).")
      return
    }

    const payload = {
      job_title: title,
      salary_min: form.salary_min === "" ? null : Number(form.salary_min),
      salary_target:
        form.salary_target === "" ? null : Number(form.salary_target),
      location_modes: form.location_modes,
      locations: form.locations
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }

    setSaving(true)
    if (editingId) {
      const { data, error } = await updateRoleTarget(editingId, payload)
      setSaving(false)
      if (error) {
        setError(error.message)
        return
      }
      setTargets((prev) => prev.map((t) => (t.id === editingId ? data : t)))
    } else {
      const { data, error } = await createRoleTarget(payload)
      setSaving(false)
      if (error) {
        setError(error.message)
        return
      }
      setTargets((prev) => [...prev, data])
    }
    resetForm()
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your role targets…
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {targets.length === 0 && !editingId && (
        <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
          No role targets yet. Add at least one below to continue. 🎯
        </div>
      )}

      {targets.length > 0 && (
        <ul className="space-y-3">
          {targets.map((t) => (
            <li
              key={t.id}
              className="rounded-lg border border-border bg-card p-4 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-heading text-lg text-primary">
                  {t.job_title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(t.location_modes ?? [])
                    .map(
                      (m) =>
                        LOCATION_MODES.find((x) => x.value === m)?.label ?? m,
                    )
                    .join(" · ")}
                  {t.locations?.length > 0 && ` — ${t.locations.join(", ")}`}
                </p>
                {formatSalaryRange(t) && (
                  <p className="text-sm text-muted-foreground">
                    {formatSalaryRange(t)}
                  </p>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => startEdit(t)}
                  aria-label="Edit"
                >
                  <Pencil />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(t.id)}
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
            {editingId ? "Edit role target" : "Add a role target"}
          </h3>
          {editingId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetForm}
            >
              <X />
              Cancel
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_title">Job title *</Label>
          <Input
            id="job_title"
            value={form.job_title}
            onChange={(e) =>
              setForm((f) => ({ ...f, job_title: e.target.value }))
            }
            placeholder="e.g. Senior Project Manager"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary_min">Salary min (optional)</Label>
            <Input
              id="salary_min"
              type="number"
              min="0"
              value={form.salary_min}
              onChange={(e) =>
                setForm((f) => ({ ...f, salary_min: e.target.value }))
              }
              placeholder="80000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary_target">Salary target (optional)</Label>
            <Input
              id="salary_target"
              type="number"
              min="0"
              value={form.salary_target}
              onChange={(e) =>
                setForm((f) => ({ ...f, salary_target: e.target.value }))
              }
              placeholder="100000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Where would you work? *</Label>
          <div className="flex flex-wrap gap-2">
            {LOCATION_MODES.map((mode) => {
              const selected = form.location_modes.includes(mode.value)
              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => toggleMode(mode.value)}
                  className={
                    "rounded-full border px-4 py-1.5 text-sm transition-colors " +
                    (selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:bg-secondary")
                  }
                >
                  {mode.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="locations">Specific locations (optional)</Label>
          <Input
            id="locations"
            value={form.locations}
            onChange={(e) =>
              setForm((f) => ({ ...f, locations: e.target.value }))
            }
            placeholder="e.g. New York, San Francisco, Austin"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated. Leave blank if location is flexible.
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : editingId ? "Update target" : "Save target"}
        </Button>
      </form>
    </div>
  )
}
