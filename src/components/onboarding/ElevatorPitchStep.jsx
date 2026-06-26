import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PITCH_QUESTIONS, assemblePitch } from "@/lib/elevatorPitchQuiz"
import {
  getElevatorPitch,
  upsertElevatorPitch,
  deferElevatorPitch,
} from "@/lib/elevatorPitch"

const emptyAnswers = PITCH_QUESTIONS.reduce(
  (acc, q) => ({ ...acc, [q.key]: "" }),
  {},
)

function allRequiredAnswered(answers) {
  return PITCH_QUESTIONS.filter((q) => q.required).every(
    (q) => (answers[q.key] ?? "").trim() !== "",
  )
}

function missingRequiredKeys(answers) {
  return PITCH_QUESTIONS.filter(
    (q) => q.required && (answers[q.key] ?? "").trim() === "",
  )
}

export function ElevatorPitchStep({ onValidityChange }) {
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState(emptyAnswers)
  const [pitchText, setPitchText] = useState("")
  const [pageIndex, setPageIndex] = useState(0)
  const [savedSnapshot, setSavedSnapshot] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deferring, setDeferring] = useState(false)
  const [error, setError] = useState("")

  const totalPages = PITCH_QUESTIONS.length + 1
  const isLastPage = pageIndex === totalPages - 1
  const isFirstPage = pageIndex === 0
  const currentQuestion = isLastPage ? null : PITCH_QUESTIONS[pageIndex]
  const readyForDraft = allRequiredAnswered(answers)

  const hasValidSave =
    savedSnapshot !== null &&
    (savedSnapshot.pitch !== null || savedSnapshot.deferredAt !== null)

  const dirty =
    savedSnapshot !== null &&
    (JSON.stringify(answers) !== JSON.stringify(savedSnapshot.answers) ||
      pitchText !== (savedSnapshot.pitch ?? ""))

  useEffect(() => {
    let active = true
    getElevatorPitch().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setError(error.message)
      } else if (data) {
        const loadedAnswers = { ...emptyAnswers, ...(data.quiz_answers ?? {}) }
        setAnswers(loadedAnswers)
        setPitchText(data.pitch ?? "")
        setSavedSnapshot({
          answers: loadedAnswers,
          pitch: data.pitch,
          deferredAt: data.deferred_at,
        })
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

  // Auto-fill the draft textarea on first visit to page 5 (or if user has cleared it).
  // Treats empty pitchText as "give me a fresh draft from the quiz answers".
  useEffect(() => {
    if (isLastPage && pitchText === "" && readyForDraft) {
      setPitchText(assemblePitch(answers))
    }
  }, [isLastPage, readyForDraft]) // eslint-disable-line react-hooks/exhaustive-deps

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  function resetDraftFromQuiz() {
    setPitchText(assemblePitch(answers))
  }

  async function handleSave() {
    setError("")
    const trimmed = pitchText.trim()
    if (!trimmed) {
      setError(
        "Your pitch is empty. Type something, or click 'Build draft from my answers' if you want a starting point from your quiz answers.",
      )
      return
    }
    setSaving(true)
    const { data, error } = await upsertElevatorPitch({
      pitch: trimmed,
      quiz_answers: answers,
    })
    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    setSavedSnapshot({
      answers: { ...answers },
      pitch: trimmed,
      deferredAt: data?.deferred_at ?? savedSnapshot?.deferredAt ?? null,
    })
  }

  async function handleDefer() {
    setError("")
    setDeferring(true)
    const { data, error } = await deferElevatorPitch()
    setDeferring(false)
    if (error) {
      setError(error.message)
      return
    }
    const newDeferredAt = data?.deferred_at ?? new Date().toISOString()
    setSavedSnapshot((prev) => ({
      answers: prev?.answers ?? emptyAnswers,
      pitch: prev?.pitch ?? null,
      deferredAt: newDeferredAt,
    }))
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        Loading your elevator pitch…
      </div>
    )
  }

  const wordCount = pitchText.trim().split(/\s+/).filter(Boolean).length
  const showDeferLink =
    !savedSnapshot?.pitch && !savedSnapshot?.deferredAt

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {isLastPage
              ? "Your draft"
              : `Question ${pageIndex + 1} of ${PITCH_QUESTIONS.length}`}
          </span>
          {hasValidSave && (
            <span className="italic">
              {dirty
                ? "You have unsaved changes"
                : savedSnapshot?.pitch
                  ? "Saved"
                  : "Skipped for now"}
            </span>
          )}
        </div>
        <div className="h-1 bg-muted rounded overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {!isLastPage ? (
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-heading text-xl text-primary">
              {currentQuestion.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.subtitle}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`q-${currentQuestion.key}`}>
              Your answer{currentQuestion.required ? " *" : ""}
            </Label>
            <Input
              id={`q-${currentQuestion.key}`}
              value={answers[currentQuestion.key]}
              onChange={(e) => setAnswer(currentQuestion.key, e.target.value)}
              placeholder={currentQuestion.placeholder}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-heading text-xl text-primary">Your draft pitch</h3>
            <p className="text-sm text-muted-foreground">
              {readyForDraft
                ? "Edit freely until it sounds like you. Aim for 30–40 words. 🎤"
                : "Head back to fill in the missing required questions and your draft will appear here."}
            </p>
          </div>

          {readyForDraft ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="pitch-text">Your pitch *</Label>
                <Textarea
                  id="pitch-text"
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  rows={5}
                  placeholder="Your draft will appear here."
                />
                <p className="text-xs text-muted-foreground">
                  {wordCount} {wordCount === 1 ? "word" : "words"}
                </p>
              </div>

              <Button type="button" onClick={resetDraftFromQuiz}>
                Build draft from my answers
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Still need an answer for:{" "}
              {missingRequiredKeys(answers)
                .map((q) => `Q${PITCH_QUESTIONS.indexOf(q) + 1}`)
                .join(", ")}
            </p>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isFirstPage}
          onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
        >
          ← Previous question
        </Button>

        {isLastPage ? (
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving || !readyForDraft}
          >
            {saving
              ? "Saving…"
              : savedSnapshot?.pitch
                ? "Update my pitch"
                : "Save my pitch"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() =>
              setPageIndex((i) => Math.min(totalPages - 1, i + 1))
            }
          >
            Next question →
          </Button>
        )}
      </div>

      {showDeferLink && (
        <div className="text-center">
          <button
            type="button"
            onClick={handleDefer}
            disabled={deferring}
            className="text-sm text-muted-foreground underline hover:text-primary disabled:opacity-50"
          >
            {deferring ? "Saving…" : "I will come back to this later"}
          </button>
        </div>
      )}

      {hasValidSave && dirty && (
        <p className="text-sm text-muted-foreground italic text-right">
          Your changes are not saved yet — head to the last page to save them.
        </p>
      )}
    </div>
  )
}
