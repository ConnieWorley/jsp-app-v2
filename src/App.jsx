import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthForm } from "@/components/auth/AuthForm"
import { useAuth } from "@/context/AuthContext"

const greetings = [
  (name) => `You've got this, ${name}! ⭐`,
  (name) => `Hey ${name} — ready to make some moves? 🚀`,
  (name) => `Time to shine, ${name}! ✨`,
  (name) => `${name}, let's land that next role 🎯`,
  (name) => `Welcome back, ${name} — eyes on the prize 👀`,
]

function WelcomeScreen({ user, onSignOut }) {
  const firstName =
    user.user_metadata?.first_name || user.email.split("@")[0]
  const [greetingIndex] = useState(() =>
    Math.floor(Math.random() * greetings.length)
  )
  const greeting = greetings[greetingIndex](firstName)

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="font-heading text-4xl text-primary">{greeting}</h1>
        <Button variant="outline" onClick={onSignOut}>
          Log out
        </Button>
      </div>
    </main>
  )
}

function App() {
  const { user, loading, signOut } = useAuth()

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

  return <WelcomeScreen user={user} onSignOut={signOut} />
}

export default App
