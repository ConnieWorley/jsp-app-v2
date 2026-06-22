import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

const steps = [
  {
    id: "ideal-company",
    title: "Ideal Company Quiz",
    us: "US-S001",
    description:
      "What does your dream workplace look like? We'll walk you through a guided quiz — size, industry, culture, values, deal-breakers — so we can score future jobs against what actually matters to you. 🏢",
  },
  {
    id: "role-target",
    title: "Role Target Profile",
    us: "US-S002",
    description:
      "Tell us the roles you're aiming for — job titles, salary range, and where you're open to working (remote / hybrid / onsite). At least one target unlocks job intake. 🎯",
  },
  {
    id: "resume-library",
    title: "Resume Library",
    us: "US-S003",
    description:
      "Upload up to 3 master resumes (PDF or Word) and label each one — say, \"Operations\" or \"Project Management.\" We'll grab the right one when tailoring per job. 📄",
  },
  {
    id: "pitch-library",
    title: "Pitch Library",
    us: "US-S004",
    description:
      "Stash 2–3 tailored professional summaries — one per role target. Optional AI assist if you want a draft. 💬",
  },
  {
    id: "storybank",
    title: "Storybank",
    us: "US-S005",
    description:
      "Build 5–6 behavioral stories in STAR format. We'll match them to interview questions automatically. The AI nudges you if a section's looking thin. ✨",
  },
  {
    id: "job-boards",
    title: "Job Board Preferences",
    us: "US-S006",
    description:
      "Pick 3–4 job boards to focus on. We'll give you setup tips for each — how to configure alerts that surface the right jobs. 🎣",
  },
  {
    id: "elevator-pitch",
    title: "Elevator Pitch",
    us: "US-S007",
    description:
      "Build your 12-second pitch (~30–40 words) with AI guidance. We'll surface it again at interview prep so you walk in ready. 🎤",
  },
  {
    id: "setup-review",
    title: "Setup Review",
    us: "US-S008",
    description:
      "A recap of what's done vs. still open. Required: Ideal Company Quiz, Role Target, ≥1 resume, ≥1 story, Follow-Up Schedule. Recommended: Pitch Library, Elevator Pitch. ✅",
  },
  {
    id: "follow-up",
    title: "Follow-Up Schedule",
    us: "US-S009",
    description:
      "Set your default follow-up cadence — days to tailor a resume after saving a job, days to reach out after applying, days to follow up on outreach. You can override per job. ⏰",
  },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [finishing, setFinishing] = useState(false)
  const navigate = useNavigate()
  const { completeOnboarding } = useAuth()

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1
  const progressPct = ((currentStep + 1) / steps.length) * 100

  async function handleNext() {
    if (isLast) {
      setFinishing(true)
      const { error } = await completeOnboarding()
      if (error) {
        setFinishing(false)
        alert(`Couldn't save your progress: ${error.message}`)
        return
      }
      navigate("/dashboard", { replace: true })
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
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isFirst || finishing}
          >
            <ChevronLeft />
            Back
          </Button>
          <Button onClick={handleNext} disabled={finishing}>
            {isLast ? (
              <>
                {finishing ? "Saving…" : "Finish"}
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
