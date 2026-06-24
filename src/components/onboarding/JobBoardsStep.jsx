import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { JOB_BOARDS } from "@/lib/jobBoards"
import { getPreferences, upsertPreferences } from "@/lib/jobBoardPreferences"

const emptyCustomForm = { name: "", url: "" }

export function JobBoardsStep({ onValidityChange }) {
  const [selectedStandard, setSelectedStandard] = useState([])
  const [customBoards, setCustomBoards] = useState([])
  const [customForm, setCustomForm] = useState(emptyCustomForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [hasValidSave, setHasValidSave] = useState(false)

  useEffect(() => {
    let active = true
    getPreferences().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setError(error.message)
      } else if (data) {
        setSelectedStandard(data.standard_boards ?? [])
        setCustomBoards(data.custom_boards ?? [])
        const total =
          (data.standard_boards?.length ?? 0) +
          (data.custom_boards?.length ?? 0)
        setHasValidSave(total >= 1)
      }
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    onValidityChange?.(hasValidSave)
  }, [hasValidSave, onValidityChange])

  function toggleStandard(slug) {
    setSelectedStandard((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  function addCustomBoard(e) {
    e.preventDefault()
    const name = customForm.name.trim()
    const url = customForm.url.trim()
    if (!name) {
      setError("Give the board a name so you can find it later.")
      return
    }
    setCustomBoards((prev) => [...prev, { name, url }])
    setCustomForm(emptyCustomForm)
    setError("")
  }

  function removeCustomBoard(index) {
    setCustomBoards((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    setError("")
    const total = selectedStandard.length + customBoards.length
    if (total === 0) {
      setError("Pick at least one board (or add a custom one) so we know where to focus.")
      return
    }
    setSaving(true)
    const { error } = await upsertPreferences({
      standard_boards: selectedStandard,
      custom_boards: customBoards,
    })
    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    setHasValidSave(true)
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your job board picks…
      </div>
    )
  }

  const totalSelected = selectedStandard.length + customBoards.length
  const tally =
    totalSelected === 0
      ? "Pick at least one board."
      : totalSelected === 1
        ? "1 board selected. 3 or 4 is the sweet spot."
        : totalSelected >= 3 && totalSelected <= 4
          ? `${totalSelected} boards selected — that is the sweet spot. 🎯`
          : `${totalSelected} boards selected.`

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-dashed border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Pick the job boards you want to focus on. Three or four at a time is the sweet spot — you can always rotate later. Each board has its own search and alert quirks; we have included a starter prompt for each one. 🎣
        </p>
      </div>

      <div className="space-y-3">
        {JOB_BOARDS.map((board) => {
          const checked = selectedStandard.includes(board.slug)
          return (
            <label
              key={board.slug}
              className="block rounded-lg border border-border bg-card p-4 cursor-pointer hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1.5 h-4 w-4 rounded border-border accent-primary cursor-pointer"
                  checked={checked}
                  onChange={() => toggleStandard(board.slug)}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-heading text-lg text-primary">
                      {board.name}
                    </span>
                    <a
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground underline hover:text-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open ↗
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {board.search_prompt}
                  </p>
                </div>
              </div>
            </label>
          )
        })}
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <h3 className="font-heading text-xl text-primary">Add your own</h3>
        <p className="text-sm text-muted-foreground">
          Niche board not in the list? Add it here. URL is optional but handy.
        </p>

        {customBoards.length > 0 && (
          <ul className="space-y-2">
            {customBoards.map((b, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{b.name}</p>
                  {b.url && (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground underline hover:text-primary"
                    >
                      {b.url}
                    </a>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCustomBoard(i)}
                  aria-label="Remove"
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={addCustomBoard}
          className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 items-end"
        >
          <div className="space-y-1">
            <Label htmlFor="custom_name">Board name</Label>
            <Input
              id="custom_name"
              value={customForm.name}
              onChange={(e) =>
                setCustomForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="e.g. Local Recruiter Network"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="custom_url">URL (optional)</Label>
            <Input
              id="custom_url"
              type="url"
              value={customForm.url}
              onChange={(e) =>
                setCustomForm((f) => ({ ...f, url: e.target.value }))
              }
              placeholder="https://..."
            />
          </div>
          <Button type="submit" variant="outline">
            <Plus />
            Add
          </Button>
        </form>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 gap-4">
        <p className="text-sm text-muted-foreground">{tally}</p>
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving || totalSelected === 0}
        >
          {saving ? "Saving…" : hasValidSave ? "Update picks" : "Save picks"}
        </Button>
      </div>
    </div>
  )
}
