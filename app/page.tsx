import Sidebar from "@/components/sidebar"
import { SimpleThemeToggleButton } from "@/components/simple-theme-toggle-button"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background dark:bg-background">
      <SimpleThemeToggleButton />
      <Sidebar />
      <main className="flex-1 p-6 bg-slate-50 dark:bg-gray-800 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-foreground dark:text-foreground">Main Content Area</h1>
        <p className="text-muted-foreground dark:text-muted-foreground mb-4">
          This is where the main content of your application would go.
        </p>
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 bg-card dark:bg-card rounded-lg shadow">
              <h2 className="text-lg font-medium text-card-foreground dark:text-card-foreground">
                Sample Card {i + 1}
              </h2>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                Some placeholder content for the card to demonstrate scrolling.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
