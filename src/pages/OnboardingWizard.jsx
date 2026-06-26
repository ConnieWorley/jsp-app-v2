import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { RoleTargetStep } from "@/components/onboarding/RoleTargetStep"
import { FollowUpScheduleStep } from "@/components/onboarding/FollowUpScheduleStep"
import { StorybankStep } from "@/components/onboarding/StorybankStep"
import { JobBoardsStep } from "@/components/onboarding/JobBoardsStep"
import { IdealCompanyStep } from "@/components/onboarding/IdealCompanyStep"
import { ResumeLibraryStep } from "@/components/onboarding/ResumeLibraryStep"
import { ElevatorPitchStep } from "@/components/onboarding/ElevatorPitchStep"

const steps = [
  {
    id: "ideal-company",
    title: "Ideal Company Quiz",
    us: "US-S001",
    description:
      "What does your dream workplace look like? We will walk you through a guided quiz — size, industry, culture, values, deal-breakers — so we can score future jobs against what actually matters to you. 🏢",
  },
  {
    id: "role-target",
    title: "Role Target Profile",
    us: "US-S002",
    description:
      "Tell us the roles you are aiming for — job titles, salary range, and where you are open to working (remote / hybrid / onsite). At least one target unlocks job intake. 🎯",
  },
  {
    id: "resume-library",
    title: "Resume Library",
    us: "US-S003",
    description:
      "Upload up to 3 master resumes (PDF or Word) and label each one — say, \"Operations\" or \"Project Management.\" We will grab the right one when tailoring per job. 📄",
  },
  {
    id: "storybank",
    title: "Storybank",
    us: "US-S005",
    description:
      "Build 5–6 behavioral stories in STAR format. We will match them to interview questions automatically. The AI nudges you if a section is looking thin. ✨",
  },
  {
    id: "job-boards",
    title: "Job Board Preferences",
    us: "US-S006",
    description:
      "Pick 3–4 job boards to focus on. We will give you setup tips for each — how to configure alerts that surface the right jobs. 🎣",
  },
  {
    id: "elevator-pitch",
    title: "Elevator Pitch",
    us: "US-S007",
    description:
      "Build your 12-second pitch (~30–40 words) with AI guidance. We will surface it again at interview prep so you walk in ready. 🎤",
  },
  {
    id: "setup-review",
    title: "Setup Review",
    us: "US-S008",
    description:
      "A recap of what is done vs. still open. Required: Ideal Company Quiz, Role Target, ≥1 resume, ≥1 story, Follow-Up Schedule. Recommended: Elevator Pitch. ✅",
  },
  {
    id: "follow-up",
    title: "Follow-Up Schedule",
    us: "US-S009",
    description:
      "Set your default cadence — when to tailor and apply, when to start outreach, and three escalating follow-ups after your initial contact. You can override the offsets on a per-job basis later. ⏰",
  },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [finishing, setFinishing] = useState(false)
  const [stepValid, setStepValid] = useState({})
  const navigate = useNavigate()
  const { completeOnboarding } = useAuth()

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1
  const progressPct = ((currentStep + 1) / steps.length) * 100
  // Steps without a specialized component default to valid (true). Specialized
  // components opt in to gating by reporting false via onValidityChange.
  const currentValid = stepValid[step.id] !== false

  const reportValidity = useCallback(
    (valid) => {
      setStepValid((prev) => ({ ...prev, [step.id]: valid }))
    },
    [step.id],
  )

  async function handleNext() {
    if (isLast) {
      setFinishing(true)
      const { error } = await completeOnboarding()
      if (error) {
        setFinishing(false)
        alert(`Could not save your progress: ${error.message}`)
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

  function renderStepBody() {
    switch (step.id) {
      case "role-target":
        return <RoleTargetStep onValidityChange={reportValidity} />
      case "follow-up":
        return <FollowUpScheduleStep onValidityChange={reportValidity} />
      case "storybank":
        return <StorybankStep onValidityChange={reportValidity} />
      case "job-boards":
        return <JobBoardsStep onValidityChange={reportValidity} />
      case "ideal-company":
        return <IdealCompanyStep onValidityChange={reportValidity} />
      case "resume-library":
        return <ResumeLibraryStep onValidityChange={reportValidity} />
      case "elevator-pitch":
        return <ElevatorPitchStep onValidityChange={reportValidity} />
      default:
        return (
          <p className="text-xs text-muted-foreground italic">
            (Real form fields land in a future step. For now, click Next to
            move on.)
          </p>
        )
    }
  }

  const navButtons = (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={isFirst || finishing}
      >
        <ChevronLeft />
        Back
      </Button>
      <Button onClick={handleNext} disabled={finishing || !currentValid}>
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
  )

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

        {/* Top nav — mirrors the footer so users do not have to scroll */}
        {navButtons}

        {/* Step intro */}
        <div className="rounded-lg border border-border bg-card p-8 space-y-3">
          <h2 className="font-heading text-3xl text-primary">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>

        {/* Step body — specialized component or placeholder */}
        {renderStepBody()}

        {/* Footer nav */}
        <div className="space-y-2">
          {navButtons}
          {!currentValid && (
            <p className="text-sm text-muted-foreground text-right">
              A little more here and you can keep going.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
