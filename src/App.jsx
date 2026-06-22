import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="font-heading text-5xl text-primary">
          Job Search Playbook
        </h1>
        <p className="text-muted-foreground text-lg">
          Design system smoke test. If this heading renders in Playfair Display
          teal on a cream background, with Inter body text and three styled
          buttons below, the Tailwind + shadcn/ui setup is working.
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <Button>Primary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </main>
  )
}

export default App
