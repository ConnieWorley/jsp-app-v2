import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

const greetings = [
  (name) => `You can do this, ${name}! ⭐`,
  (name) => `Hey ${name} — ready to make some moves? 🚀`,
  (name) => `Time to shine, ${name}! ✨`,
  (name) => `${name}, time to land that next role 🎯`,
  (name) => `Welcome back, ${name} — eyes on the prize 👀`,
]

export function DashboardPage() {
  const { user } = useAuth()
  const firstName =
    user.user_metadata?.first_name || user.email.split("@")[0]
  const [greetingIndex] = useState(() =>
    Math.floor(Math.random() * greetings.length)
  )
  const greeting = greetings[greetingIndex](firstName)

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl text-primary">{greeting}</h1>
      <p className="text-muted-foreground">
        Your dashboard will live here.
      </p>
    </div>
  )
}
