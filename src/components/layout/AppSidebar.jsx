import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquareQuote,
  ListChecks,
  Target,
  Users,
  Gauge,
  Settings,
  LogOut,
  RotateCcw,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"

const navItems = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "Jobs", to: "/jobs", icon: Briefcase },
  { title: "Resumes", to: "/resumes", icon: FileText },
  { title: "Stories", to: "/stories", icon: MessageSquareQuote },
  { title: "Checklists", to: "/checklists", icon: ListChecks },
  { title: "Target Companies", to: "/target-companies", icon: Target },
  { title: "Networking", to: "/networking", icon: Users },
  { title: "Skills Gap", to: "/skills-gap", icon: Gauge },
  { title: "Setup", to: "/setup", icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut, resetOnboarding, onboardingComplete } = useAuth()
  const { setOpen, setOpenMobile, isMobile } = useSidebar()
  const [showLockedBanner, setShowLockedBanner] = useState(false)
  const dismissTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current)
    }
  }, [])

  function collapseSidebar() {
    if (isMobile) setOpenMobile(false)
    else setOpen(false)
  }

  // Intercept nav clicks when onboarding is incomplete. Surfaces a transient
  // banner instead of letting the click silently bounce off App.jsx route guards.
  function handleNavClick(e) {
    if (onboardingComplete) {
      collapseSidebar()
      return
    }
    e.preventDefault()
    setShowLockedBanner(true)
    if (dismissTimer.current) clearTimeout(dismissTimer.current)
    dismissTimer.current = setTimeout(() => setShowLockedBanner(false), 5000)
  }

  async function handleResetOnboarding() {
    if (!confirm("Reset onboarding completion? You will be sent back to the wizard.")) return
    const { error } = await resetOnboarding()
    if (error) {
      alert(`Could not reset onboarding: ${error.message}`)
      return
    }
    navigate("/onboarding", { replace: true })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {showLockedBanner && (
          <div className="rounded-md border border-destructive text-destructive px-3 py-2 text-xs leading-snug">
            Complete required sections of the Setup wizard.
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild onClick={handleNavClick}>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-heading text-lg">
                  J
                </div>
                <span className="font-heading text-base font-semibold">
                  Job Search Playbook
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={handleNavClick}
                    >
                      <Link to={item.to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {import.meta.env.DEV && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleResetOnboarding}
                tooltip="Reset onboarding (dev)"
              >
                <RotateCcw />
                <span>Reset onboarding</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut} tooltip="Log out">
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
