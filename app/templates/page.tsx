"use client"

import { useState } from "react"
import { AppHeader } from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEye,
  faPlus,
  faMobile,
  faDesktop,
  faHeart,
  faCalendarAlt,
  faDollarSign,
  faUsers,
  faGift,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const templatesData = [
  {
    id: "annual-membership",
    title: "Annual Membership",
    description:
      "Perfect for organizations building recurring revenue through annual memberships with automated reminders.",
    category: "Membership",
    popularity: "Most Popular",
    features: ["Recurring payments", "Member portal access", "Automated renewal emails", "Member benefits tracking"],
    estimatedTime: "5 min setup",
    conversionRate: "18.5%",
    icon: faUsers,
    color: "bg-blue-500",
    previewImage: "/placeholder.svg?height=400&width=300&text=Annual+Membership+Form",
    mobilePreview: {
      title: "Join Our Community",
      subtitle: "Annual Membership - $99/year",
      fields: ["Full Name", "Email Address", "Phone Number", "Membership Level"],
      cta: "Become a Member",
    },
  },
  {
    id: "event-registration",
    title: "Event Registration",
    description:
      "Streamlined registration for galas, fundraising events, and special occasions with ticket management.",
    category: "Events",
    popularity: "Trending",
    features: ["Ticket management", "Seating preferences", "Dietary requirements", "Group registrations"],
    estimatedTime: "7 min setup",
    conversionRate: "22.3%",
    icon: faCalendarAlt,
    color: "bg-purple-500",
    previewImage: "/placeholder.svg?height=400&width=300&text=Event+Registration+Form",
    mobilePreview: {
      title: "Annual Gala 2024",
      subtitle: "Join us for an evening of impact",
      fields: ["Guest Name", "Email", "Ticket Type", "Dietary Preferences"],
      cta: "Register Now",
    },
  },
  {
    id: "general-donation",
    title: "General Donation",
    description:
      "A versatile donation form that works for any cause with customizable giving levels and donor recognition features.",
    category: "Fundraising",
    popularity: "Essential",
    features: ["Flexible amounts", "Tribute gifts", "Donor recognition", "Tax receipts"],
    estimatedTime: "3 min setup",
    conversionRate: "15.7%",
    icon: faHeart,
    color: "bg-red-500",
    previewImage: "/placeholder.svg?height=400&width=300&text=General+Donation+Form",
    mobilePreview: {
      title: "Make a Difference",
      subtitle: "Support our mission today",
      fields: ["Donation Amount", "Full Name", "Email", "Message (Optional)"],
      cta: "Donate Now",
    },
  }
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templatesData)[0] | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [creationProgress, setCreationProgress] = useState(0)
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile")
  const router = useRouter()

  const handlePreview = (template: (typeof templatesData)[0]) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleCreateFromTemplate = async (template: (typeof templatesData)[0]) => {
    setIsCreating(true)
    setCreationProgress(0)

    // Simulate form creation process
    const steps = [
      { message: "Initializing template...", progress: 20 },
      { message: "Setting up form structure...", progress: 40 },
      { message: "Configuring payment settings...", progress: 60 },
      { message: "Applying design theme...", progress: 80 },
      { message: "Finalizing your form...", progress: 100 },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setCreationProgress(step.progress)
    }

    // Redirect to forms page
    setTimeout(() => {
      router.push("/forms")
    }, 500)
  }

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-dark-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 bg-white dark:bg-dark-background overflow-y-auto custom-scrollbar">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">Form Templates</h1>
            <p className="text-muted-foreground dark:text-slate-400 max-w-3xl">
              Get started quickly with professionally designed form templates. Simply choose a template, customize it
              to match your brand, and start collecting donations in minutes.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {templatesData.map((template) => (
              <Card
                key={template.id}
                className="h-full flex flex-col dark:bg-dark-card-bg dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", template.color)}>
                      <FontAwesomeIcon icon={template.icon} className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.popularity}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{template.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground dark:text-slate-400">Category:</span>
                      <span className="font-medium">{template.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground dark:text-slate-400">Setup time:</span>
                      <span className="font-medium">{template.estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground dark:text-slate-400">Avg. conversion:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{template.conversionRate}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground dark:text-slate-400 space-y-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-custom-button-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 dark:border-slate-600 dark:text-slate-300"
                      onClick={() => handlePreview(template)}
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                      onClick={() => handleCreateFromTemplate(template)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 dark:bg-dark-card-bg dark:border-dark-border">
          <DialogHeader className="p-6 pb-4 border-b dark:border-dark-border/50">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">{selectedTemplate?.title} Preview</DialogTitle>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1">
                  See how your form will look to donors
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6 flex justify-center">
              <div className="relative">
                {/* Mobile Device Frame */}
                <div className="w-80 h-[600px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                    {/* Mobile Screen Content */}
                    <div className="p-6 h-full flex flex-col">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {selectedTemplate?.mobilePreview.title}
                        </h2>
                        <p className="text-gray-600 text-sm">{selectedTemplate?.mobilePreview.subtitle}</p>
                      </div>
                      <div className="space-y-4 flex-grow">
                        {selectedTemplate?.mobilePreview.fields.map((field, index) => (
                          <div key={index} className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">{field}</label>
                            <div className="w-full h-10 bg-gray-100 rounded-md"></div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-custom-button-primary text-slate-900 font-medium py-3 rounded-md mt-6">
                        {selectedTemplate?.mobilePreview.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="p-6 pt-6 border-t dark:border-dark-border/50">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close Preview
              </Button>
              <Button
                className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                onClick={() => {
                  setIsPreviewOpen(false)
                  if (selectedTemplate) handleCreateFromTemplate(selectedTemplate)
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Creation Progress Modal */}
      <Dialog open={isCreating} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-lg dark:bg-dark-card-bg dark:border-dark-border" hideCloseButton>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-custom-button-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-custom-button-primary animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">Creating Your Form</h3>
            <p className="text-sm text-muted-foreground dark:text-slate-400 mb-6">
              We're setting up your new form based on the {selectedTemplate?.title} template...
            </p>
            <div className="space-y-3">
              <Progress value={creationProgress} className="w-full" />
              <p className="text-xs text-muted-foreground dark:text-slate-400">{creationProgress}% complete</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
