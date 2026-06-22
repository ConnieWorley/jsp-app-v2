import { Routes, Route, Navigate } from "react-router-dom"
import { AuthForm } from "@/components/auth/AuthForm"
import { AppShell } from "@/components/layout/AppShell"
import { DashboardPage } from "@/pages/DashboardPage"
import { JobsPage } from "@/pages/JobsPage"
import { ResumesPage } from "@/pages/ResumesPage"
import { StoriesPage } from "@/pages/StoriesPage"
import { ChecklistsPage } from "@/pages/ChecklistsPage"
import { TargetCompaniesPage } from "@/pages/TargetCompaniesPage"
import { NetworkingPage } from "@/pages/NetworkingPage"
import { SkillsGapPage } from "@/pages/SkillsGapPage"
import { SetupPage } from "@/pages/SetupPage"
import { OnboardingWizard } from "@/pages/OnboardingWizard"
import { useAuth } from "@/context/AuthContext"

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <AuthForm />
      </main>
    )
  }

  return (
    <Routes>
      <Route path="onboarding" element={<OnboardingWizard />} />
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="resumes" element={<ResumesPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="checklists" element={<ChecklistsPage />} />
        <Route path="target-companies" element={<TargetCompaniesPage />} />
        <Route path="networking" element={<NetworkingPage />} />
        <Route path="skills-gap" element={<SkillsGapPage />} />
        <Route path="setup" element={<SetupPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
