import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    id: "profile",
    title: "Job Seeker Profile",
    us: "US-S001",
    description:
      "Tell us about you — first and last name, current role, years of experience, and target salary range.",
  },
  {
    id: "roles",
    title: "Target Roles",
    us: "US-S002",
    description:
      "Which job titles are you aiming for? Add as many as you'd like — we'll use them to tailor your search.",
  },
  {
    id: "industries",
    title: "Target Industries",
    us: "US-S003",
    description:
      "Pick the industries you want to focus on. Optional, but it helps narrow your target-company list.",
  },
  {
    id: "locations",
    title: "Target Locations",
    us: "US-S004",
    description:
      "Where are you open to working? Add cities, regions, or 'remote' — and we'll respect your preferences.",
  },
  {
    id: "preferences",
    title: "Work Preferences",
    us: "US-S005",
    description:
      "Remote vs. hybrid vs. onsite, company size, comp expectations, and anything else that's a must-have or deal-breaker.",
  },
  {
    id: "resume",
    title: "Resume Upload",
    us: "US-S006",
    description:
      "Upload your current resume so we have a base version to tailor per role. PDF or Word.",
  },
  {
    id: "skills",
    title: "Skills Inventory",
    us: "US-S007",
    description:
      "List the skills you bring to the table. We'll cross-reference these with target roles to spot gaps.",
  },
  {
    id: "checklists",
    title: "Checklist Template",
    us: "US-S008",
    description:
      "Pick a default checklist template (or leave blank). You'll use it to track prep and follow-up per application.",
  },
  {
    id: "followup",
    title: "Follow-Up Schedule",
    us: "US-S009",
    description:
      "Set your default follow-up cadence (e.g. 3 days after applying, 1 week after an interview). You can override per job.",
  },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1
  const progressPct = ((currentStep + 1) / steps.length) * 100

  function handleNext() {
    if (isLast) {
      navigate("/dashboard")
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  function handleBack() {
    if (!isFirst) setCurrentStep((s) => s - 1)
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Brand strip */}
        <header className="text-center space-y-1">
          <h1 className="font-heading text-2xl text-primary">
            Job Search Playbook
          </h1>
          <p className="text-sm text-muted-foreground">Setup wizard</p>
        </header>

        {/* Step indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-muted-foreground">{step.us}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="rounded-lg border border-border bg-card p-8 space-y-3">
          <h2 className="font-heading text-3xl text-primary">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
          <p className="text-xs text-muted-foreground italic pt-4">
            (Real form fields land in a future step. For now, click Next to
            move on.)
          </p>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} disabled={isFirst}>
            <ChevronLeft />
            Back
          </Button>
          <Button onClick={handleNext}>
            {isLast ? (
              <>
                Finish
                <Check />
              </>
            ) : (
              <>
                Next
                <ChevronRight />
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  )
}
