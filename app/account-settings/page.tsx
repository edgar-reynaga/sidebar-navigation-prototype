// Placeholder page for account settings
export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* You might want to include your AppHeader here too, or have a different layout */}
      {/* For simplicity, I'm omitting the header for this specific page example */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Account & Company Information</h1>
        <div className="bg-card p-6 rounded-lg shadow">
          <p className="text-card-foreground">
            This is where account information and settings would be displayed and managed.
          </p>
          {/* Add form fields, user details, etc. here */}
          <div className="mt-4">
            <p>
              <strong>Email:</strong> user@example.com
            </p>
            <br></br>

            <p>
              <strong>Phone:</strong> 000-123-7777
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
