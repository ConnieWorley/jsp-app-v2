import { useEffect, useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QUIZ_QUESTIONS } from "@/lib/idealCompanyOptions"
import { getIdealCompany, upsertIdealCompany } from "@/lib/idealCompany"

const emptyAnswers = {
  size_standard: [],
  industry_standard: [],
  industry_custom: [],
  culture_standard: [],
  culture_custom: [],
  values_standard: [],
  values_custom: [],
  dealbreakers: [],
}

function hasAnyAnswer(answers, question) {
  const std = question.standardCol ? answers[question.standardCol] : []
  const cus = question.customCol ? answers[question.customCol] : []
  return (std?.length ?? 0) > 0 || (cus?.length ?? 0) > 0
}

function allRequiredAnswered(answers) {
  return QUIZ_QUESTIONS.filter((q) => q.required).every((q) =>
    hasAnyAnswer(answers, q),
  )
}

export function IdealCompanyStep({ onValidityChange }) {
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState(emptyAnswers)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [customInputs, setCustomInputs] = useState({})
  const [hasValidSave, setHasValidSave] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    getIdealCompany().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setError(error.message)
      } else if (data) {
        const loaded = {
          size_standard: data.size_standard ?? [],
          industry_standard: data.industry_standard ?? [],
          industry_custom: data.industry_custom ?? [],
          culture_standard: data.culture_standard ?? [],
          culture_custom: data.culture_custom ?? [],
          values_standard: data.values_standard ?? [],
          values_custom: data.values_custom ?? [],
          dealbreakers: data.dealbreakers ?? [],
        }
        setAnswers(loaded)
        setHasValidSave(allRequiredAnswered(loaded))
      }
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    onValidityChange?.(hasValidSave && !dirty)
  }, [hasValidSave, dirty, onValidityChange])

  function toggleStandard(standardCol, slug) {
    setAnswers((prev) => {
      const current = prev[standardCol] ?? []
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug]
      return { ...prev, [standardCol]: next }
    })
    setDirty(true)
  }

  function addCustom(customCol, value) {
    const trimmed = value.trim()
    if (!trimmed) return
    setAnswers((prev) => {
      const current = prev[customCol] ?? []
      if (current.includes(trimmed)) return prev
      return { ...prev, [customCol]: [...current, trimmed] }
    })
    setCustomInputs((prev) => ({ ...prev, [customCol]: "" }))
    setDirty(true)
  }

  function removeCustom(customCol, value) {
    setAnswers((prev) => ({
      ...prev,
      [customCol]: (prev[customCol] ?? []).filter((v) => v !== value),
    }))
    setDirty(true)
  }

  async function handleSave() {
    setError("")
    if (!allRequiredAnswered(answers)) {
      setError("A few questions still need an answer — head back and pick at least one option for each.")
      return
    }
    setSaving(true)
    const { error } = await upsertIdealCompany(answers)
    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    setHasValidSave(true)
    setDirty(false)
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your ideal-company answers…
      </div>
    )
  }

  const question = QUIZ_QUESTIONS[questionIndex]
  const totalQuestions = QUIZ_QUESTIONS.length
  const isFirst = questionIndex === 0
  const isLast = questionIndex === totalQuestions - 1
  const standardSelected = question.standardCol
    ? (answers[question.standardCol] ?? [])
    : []
  const customSelected = question.customCol
    ? (answers[question.customCol] ?? [])
    : []
  const customInput = question.customCol
    ? (customInputs[question.customCol] ?? "")
    : ""

  const missingRequired = QUIZ_QUESTIONS.filter(
    (q) => q.required && !hasAnyAnswer(answers, q),
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          {hasValidSave && (
            <span className="italic">
              {dirty ? "You have unsaved changes" : "Saved"}
            </span>
          )}
        </div>
        <div className="h-1 bg-muted rounded overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-5">
        <div className="space-y-1">
          <h3 className="font-heading text-xl text-primary">
            {question.title}
          </h3>
          <p className="text-sm text-muted-foreground">{question.subtitle}</p>
        </div>

        {question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options.map((opt) => {
              const checked = standardSelected.includes(opt.slug)
              return (
                <label
                  key={opt.slug}
                  className={`flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                    checked
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary cursor-pointer"
                    checked={checked}
                    onChange={() => toggleStandard(question.standardCol, opt.slug)}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              )
            })}
          </div>
        )}

        {question.allowCustom && (
          <div className="space-y-2">
            {!question.freeTextOnly && (
              <Label htmlFor={`custom-${question.key}`}>Add your own</Label>
            )}
            <div className="flex gap-2">
              <Input
                id={`custom-${question.key}`}
                value={customInput}
                onChange={(e) =>
                  setCustomInputs((prev) => ({
                    ...prev,
                    [question.customCol]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCustom(question.customCol, customInput)
                  }
                }}
                placeholder={
                  question.freeTextOnly
                    ? "e.g. No required Saturday hours"
                    : "Type and press Enter"
                }
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addCustom(question.customCol, customInput)}
                disabled={!customInput.trim()}
              >
                <Plus />
                Add
              </Button>
            </div>
            {customSelected.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {customSelected.map((value) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-sm pl-3 pr-1 py-1"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => removeCustom(question.customCol, value)}
                      aria-label={`Remove ${value}`}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {isLast && missingRequired.length > 0 && (
          <p className="text-sm text-muted-foreground italic">
            Still need an answer for:{" "}
            {missingRequired
              .map((q) => `Q${QUIZ_QUESTIONS.indexOf(q) + 1}`)
              .join(", ")}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isFirst}
          onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
        >
          ← Previous question
        </Button>

        {isLast ? (
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving || !allRequiredAnswered(answers)}
          >
            {saving
              ? "Saving…"
              : hasValidSave
                ? "Update my answers"
                : "Save my answers"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() =>
              setQuestionIndex((i) => Math.min(totalQuestions - 1, i + 1))
            }
          >
            Next question →
          </Button>
        )}
      </div>

      {hasValidSave && dirty && (
        <p className="text-sm text-muted-foreground italic text-right">
          Your changes are not saved yet — head to the last question to save them.
        </p>
      )}
    </div>
  )
}
