import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Hydrate from the persisted session (localStorage) on mount, then subscribe
    // to future auth changes so signup/login/logout in any component updates the
    // context automatically.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  const user = session?.user ?? null

  const value = {
    session,
    user,
    loading,
    onboardingComplete: user?.user_metadata?.onboarding_complete === true,
    signUp: (email, password, firstName) =>
      supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName } },
      }),
    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
    completeOnboarding: () =>
      supabase.auth.updateUser({ data: { onboarding_complete: true } }),
    resetOnboarding: () =>
      supabase.auth.updateUser({ data: { onboarding_complete: false } }),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
