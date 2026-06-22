import { Outlet } from "react-router-dom"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
