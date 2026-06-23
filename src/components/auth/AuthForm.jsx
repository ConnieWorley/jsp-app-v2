import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

export function AuthForm() {
  const [mode, setMode] = useState("login")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { signUp, signIn } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    const { error: authError } =
      mode === "signup"
        ? await signUp(email, password, firstName.trim())
        : await signIn(email, password)
    if (authError) setError(authError.message)
    setSubmitting(false)
  }

  function toggleMode() {
    setMode((m) => (m === "signup" ? "login" : "signup"))
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <h2 className="font-heading text-3xl text-primary text-center">
        {mode === "signup" ? "Create account" : "Sign in"}
      </h2>

      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "..." : mode === "signup" ? "Sign up" : "Sign in"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        {mode === "signup" ? "Already have an account?" : "No account yet?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-primary underline-offset-4 hover:underline"
        >
          {mode === "signup" ? "Sign in" : "Sign up"}
        </button>
      </p>
    </form>
  )
}
