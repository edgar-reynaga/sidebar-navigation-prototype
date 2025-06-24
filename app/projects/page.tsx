"use client"

import { useState } from "react"
import { AppHeader } from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faSearch,
  faEllipsisV,
  faUsers,
  faDollarSign,
  faChartLine,
  faEdit,
  faArchive,
  faEye,
  faClock,
  faCheckCircle,
  faExclamationTriangle,
  faFilter,
  faUserPlus,
  faMobileScreenButton as faMobileNotch,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

// Types
interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  email?: string
}

interface ProjectForm {
  id: string
  name: string
  type: string
  amount: string
}

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "planning" | "completed" | "paused"
  progress: number
  targetAmount: number
  raisedAmount: number
  formsCount: number
  teamSize: number
  dueDate: string
  lastActivity: string
  recentUpdate: string
  teamMembers: TeamMember[]
  forms: ProjectForm[]
}

interface Activity {
  id: string
  user: string
  action: string
  project: string
  timestamp: string
  type: string
}

// Initial mock data
const initialProjectsData: Project[] = [
  {
    id: "1",
    name: "2025 Annual Gala",
    description: "Our flagship fundraising event featuring dinner, auction, and entertainment to support our mission.",
    status: "active",
    progress: 75,
    targetAmount: 250000,
    raisedAmount: 187500,
    formsCount: 3,
    teamSize: 3,
    dueDate: "2025-08-15",
    lastActivity: "2 hours ago",
    recentUpdate: "Sarah updated the auction form settings",
    teamMembers: [
      {
        id: "1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32&text=SJ",
        role: "Project Lead",
        email: "sarah@example.com",
      },
      {
        id: "2",
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=32&width=32&text=MC",
        role: "Designer",
        email: "mike@example.com",
      },
      {
        id: "3",
        name: "Lisa Park",
        avatar: "/placeholder.svg?height=32&width=32&text=LP",
        role: "Coordinator",
        email: "lisa@example.com",
      },
    ],
    forms: [
      { id: "1", name: "Gala Ticket Sales", type: "event", amount: "$125,000" },
      { id: "2", name: "Auction Bidding", type: "auction", amount: "$45,000" },
      { id: "3", name: "Sponsorship Packages", type: "sponsorship", amount: "$17,500" },
    ],
  },
  {
    id: "2",
    name: "Holiday Giving Campaign",
    description: "Year-end donation drive with matching gift opportunities and special holiday-themed content.",
    status: "planning",
    progress: 25,
    targetAmount: 100000,
    raisedAmount: 12500,
    formsCount: 2,
    teamSize: 2,
    dueDate: "2025-12-31",
    lastActivity: "1 day ago",
    recentUpdate: "John created the holiday donation form",
    teamMembers: [
      {
        id: "4",
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32&text=JS",
        role: "Campaign Manager",
        email: "john@example.com",
      },
      {
        id: "5",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=32&width=32&text=EW",
        role: "Content Writer",
        email: "emma@example.com",
      },
    ],
    forms: [
      { id: "4", name: "Holiday Donations", type: "donation", amount: "$8,500" },
      { id: "5", name: "Corporate Matching", type: "corporate", amount: "$4,000" },
    ],
  },
]

const initialActivityData: Activity[] = [
  {
    id: "1",
    user: "Sarah Johnson",
    action: "updated the auction form settings",
    project: "2025 Annual Gala",
    timestamp: "2 hours ago",
    type: "edit",
  },
  {
    id: "2",
    user: "John Smith",
    action: "created the holiday donation form",
    project: "Holiday Giving Campaign",
    timestamp: "1 day ago",
    type: "create",
  },
]

export default function ProjectsPage() {
  // State management
  const [projects, setProjects] = useState<Project[]>(initialProjectsData)
  const [activities, setActivities] = useState<Activity[]>(initialActivityData)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Form states
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    targetAmount: "",
    dueDate: "",
  })

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  })

  const [newForm, setNewForm] = useState({
    name: "",
    type: "",
  })

  // Helper functions
  const generateId = () => Math.random().toString(36).substr(2, 9)

  const addActivity = (user: string, action: string, projectName: string) => {
    const newActivity: Activity = {
      id: generateId(),
      user,
      action,
      project: projectName,
      timestamp: "Just now",
      type: "edit",
    }
    setActivities((prev) => [newActivity, ...prev])
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    }
    return variants[status as keyof typeof variants] || variants.planning
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500" />
      case "planning":
        return <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-blue-500" />
      case "paused":
        return <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 text-yellow-500" />
      default:
        return <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-blue-500" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Project CRUD operations
  const handleCreateProject = () => {
    if (!newProject.name.trim()) return

    const project: Project = {
      id: generateId(),
      name: newProject.name,
      description: newProject.description,
      status: "planning",
      progress: 0,
      targetAmount: Number.parseInt(newProject.targetAmount.replace(/[^0-9]/g, "")) || 0,
      raisedAmount: 0,
      formsCount: 0,
      teamSize: 1,
      dueDate: newProject.dueDate || "TBD",
      lastActivity: "Just now",
      recentUpdate: "Project created",
      teamMembers: [
        {
          id: generateId(),
          name: "You",
          avatar: "/placeholder.svg?height=32&width=32&text=Y",
          role: "Project Lead",
          email: "you@example.com",
        },
      ],
      forms: [],
    }

    setProjects((prev) => [project, ...prev])
    addActivity("You", `created project "${newProject.name}"`, newProject.name)
    setIsCreateModalOpen(false)
    setNewProject({ name: "", description: "", targetAmount: "", dueDate: "" })
  }

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId))
      addActivity("You", `archived project "${project.name}"`, project.name)
      if (selectedProject?.id === projectId) {
        setIsProjectDetailOpen(false)
        setSelectedProject(null)
      }
    }
  }

  // Team member operations
  const handleAddMember = () => {
    if (!selectedProject || !newMember.name.trim()) return

    const member: TeamMember = {
      id: generateId(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role || "Member",
      avatar: `/placeholder.svg?height=32&width=32&text=${newMember.name
        .split(" ")
        .map((n) => n[0])
        .join("")}`,
    }

    const updatedProject = {
      ...selectedProject,
      teamMembers: [...selectedProject.teamMembers, member],
      teamSize: selectedProject.teamSize + 1,
      lastActivity: "Just now",
      recentUpdate: `${newMember.name} was added to the team`,
    }

    setProjects((prev) => prev.map((p) => (p.id === selectedProject.id ? updatedProject : p)))
    setSelectedProject(updatedProject)
    addActivity("You", `invited ${newMember.name} to the project`, selectedProject.name)
    setIsAddMemberModalOpen(false)
    setNewMember({ name: "", email: "", role: "" })
  }

  const handleRemoveMember = (memberId: string) => {
    if (!selectedProject) return

    const member = selectedProject.teamMembers.find((m) => m.id === memberId)
    if (!member) return

    const updatedProject = {
      ...selectedProject,
      teamMembers: selectedProject.teamMembers.filter((m) => m.id !== memberId),
      teamSize: selectedProject.teamSize - 1,
      lastActivity: "Just now",
      recentUpdate: `${member.name} was removed from the team`,
    }

    setProjects((prev) => prev.map((p) => (p.id === selectedProject.id ? updatedProject : p)))
    setSelectedProject(updatedProject)
    addActivity("You", `removed ${member.name} from the project`, selectedProject.name)
  }

  // Form operations
  const handleAddForm = () => {
    if (!selectedProject || !newForm.name.trim()) return

    const form: ProjectForm = {
      id: generateId(),
      name: newForm.name,
      type: newForm.type || "donation",
      amount: "$0",
    }

    const updatedProject = {
      ...selectedProject,
      forms: [...selectedProject.forms, form],
      formsCount: selectedProject.formsCount + 1,
      lastActivity: "Just now",
      recentUpdate: `Added form "${newForm.name}"`,
    }

    setProjects((prev) => prev.map((p) => (p.id === selectedProject.id ? updatedProject : p)))
    setSelectedProject(updatedProject)
    addActivity("You", `added form "${newForm.name}" to the project`, selectedProject.name)
    setIsAddFormModalOpen(false)
    setNewForm({ name: "", type: "" })
  }

  const handleRemoveForm = (formId: string) => {
    if (!selectedProject) return

    const form = selectedProject.forms.find((f) => f.id === formId)
    if (!form) return

    const updatedProject = {
      ...selectedProject,
      forms: selectedProject.forms.filter((f) => f.id !== formId),
      formsCount: selectedProject.formsCount - 1,
      lastActivity: "Just now",
      recentUpdate: `Removed form "${form.name}"`,
    }

    setProjects((prev) => prev.map((p) => (p.id === selectedProject.id ? updatedProject : p)))
    setSelectedProject(updatedProject)
    addActivity("You", `removed form "${form.name}" from the project`, selectedProject.name)
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsProjectDetailOpen(true)
  }

  // Calculate stats
  const totalActiveProjects = projects.filter((p) => p.status === "active").length
  const totalRaised = projects.reduce((sum, p) => sum + p.raisedAmount, 0)
  const totalTeamMembers = projects.reduce((sum, p) => sum + p.teamSize, 0)
  const totalActiveForms = projects.reduce((sum, p) => sum + p.formsCount, 0)

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-dark-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 bg-white dark:bg-dark-background overflow-y-auto custom-scrollbar">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">Projects</h1>
              <p className="text-muted-foreground dark:text-slate-400">
                Organize your fundraising campaigns, manage teams, and track progress across all initiatives.
              </p>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium">
                  <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md dark:bg-dark-card-bg dark:border-dark-border">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name *</label>
                    <Input
                      placeholder="e.g., 2025 Annual Gala"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Brief description of the project goals and scope..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Amount</label>
                      <Input
                        placeholder="$100,000"
                        value={newProject.targetAmount}
                        onChange={(e) => setNewProject({ ...newProject, targetAmount: e.target.value })}
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={newProject.dueDate}
                        onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                        className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProject}
                    disabled={!newProject.name.trim()}
                    className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                  >
                    Create Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {projects
              .filter(
                (project) =>
                  project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (statusFilter === "all" || project.status === statusFilter),
              )
              .map((project) => (
                <Card
                  key={project.id}
                  className="dark:bg-dark-card-bg dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(project.status)}
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <Badge className={cn("text-xs", getStatusBadge(project.status))}>{project.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProjectClick(project)
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedProject(project)
                              setIsAddMemberModalOpen(true)
                            }}
                          >
                            <FontAwesomeIcon icon={faUserPlus} className="h-4 w-4 mr-2" />
                            Invite Members
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteProject(project.id)
                            }}
                          >
                            <FontAwesomeIcon icon={faArchive} className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground dark:text-slate-400">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-custom-button-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">Raised</p>
                        <p className="text-lg font-semibold text-foreground dark:text-white">
                          {formatCurrency(project.raisedAmount)}
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-slate-400">
                          of {formatCurrency(project.targetAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">Due Date</p>
                        <p className="text-lg font-semibold text-foreground dark:text-white">{project.dueDate}</p>
                      </div>
                    </div>

                    {/* Team and Forms */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.teamMembers.slice(0, 3).map((member) => (
                            <Avatar key={member.id} className="w-8 h-8 border-2 border-white dark:border-slate-700">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.teamSize > 3 && (
                            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-slate-700 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                +{project.teamSize - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground dark:text-slate-400">
                          {project.teamSize} members
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground dark:text-slate-400">{project.formsCount} forms</p>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="pt-4 border-t dark:border-slate-700">
                      <p className="text-xs text-muted-foreground dark:text-slate-400 mb-1">Latest Update</p>
                      <p className="text-sm text-foreground dark:text-white">{project.recentUpdate}</p>
                      <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">{project.lastActivity}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Recent Activity Timeline */}
          <Card className="dark:bg-dark-card-bg dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 10).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-custom-button-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4 text-custom-button-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground dark:text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-slate-400">
                        {activity.project} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={isProjectDetailOpen} onOpenChange={setIsProjectDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 dark:bg-dark-card-bg dark:border-dark-border">
          {selectedProject && (
            <>
              <DialogHeader className="p-6 pb-4 border-b dark:border-dark-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{selectedProject.name}</DialogTitle>
                    <p className="text-muted-foreground dark:text-slate-400 mt-1">{selectedProject.description}</p>
                  </div>
                  <Badge className={cn("text-sm", getStatusBadge(selectedProject.status))}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="forms">Forms ({selectedProject.formsCount})</TabsTrigger>
                    <TabsTrigger value="team">Team ({selectedProject.teamSize})</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span className="font-medium">{selectedProject.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                              <div
                                className="bg-custom-button-primary h-3 rounded-full"
                                style={{ width: `${selectedProject.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground dark:text-slate-400">Target</p>
                              <p className="text-xl font-bold">{formatCurrency(selectedProject.targetAmount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground dark:text-slate-400">Raised</p>
                              <p className="text-xl font-bold text-green-600">
                                {formatCurrency(selectedProject.raisedAmount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                          <Button
                            className="w-full justify-start bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900"
                            onClick={() => setIsAddMemberModalOpen(true)}
                          >
                            <FontAwesomeIcon icon={faUserPlus} className="h-4 w-4 mr-2" />
                            Invite Team Member
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => setIsAddFormModalOpen(true)}
                          >
                            <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                            Add Form to Project
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <FontAwesomeIcon icon={faShare} className="h-4 w-4 mr-2" />
                            Share Project
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="forms" className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Project Forms</h3>
                      <Button
                        size="sm"
                        className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900"
                        onClick={() => setIsAddFormModalOpen(true)}
                      >
                        <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                        Add Form
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {selectedProject.forms.map((form) => (
                        <Card key={form.id} className="dark:bg-slate-800/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faMobileNotch} className="h-5 w-5 text-custom-button-primary" />
                                <div>
                                  <p className="font-medium">{form.name}</p>
                                  <p className="text-sm text-muted-foreground dark:text-slate-400 capitalize">
                                    {form.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">{form.amount}</p>
                                <Button size="sm" variant="outline">
                                  View Form
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRemoveForm(form.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {selectedProject.forms.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground dark:text-slate-400">
                          No forms added yet. Click "Add Form" to get started.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="team" className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Team Members</h3>
                      <Button
                        size="sm"
                        className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900"
                        onClick={() => setIsAddMemberModalOpen(true)}
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="h-4 w-4 mr-2" />
                        Invite Member
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {selectedProject.teamMembers.map((member) => (
                        <Card key={member.id} className="dark:bg-slate-800/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-sm text-muted-foreground dark:text-slate-400">{member.role}</p>
                                  {member.email && (
                                    <p className="text-xs text-muted-foreground dark:text-slate-500">{member.email}</p>
                                  )}
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleRemoveMember(member.id)}
                                  >
                                    Remove from Project
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="activity" className="mt-6">
                    <div className="space-y-4">
                      {activities
                        .filter((activity) => activity.project === selectedProject.name)
                        .map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-custom-button-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <FontAwesomeIcon icon={faEdit} className="h-4 w-4 text-custom-button-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{activity.user}</span> {activity.action}
                              </p>
                              <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1">
                                {activity.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Member Modal */}
      <Dialog open={isAddMemberModalOpen} onOpenChange={setIsAddMemberModalOpen}>
        <DialogContent className="sm:max-w-md dark:bg-dark-card-bg dark:border-dark-border">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name *</label>
              <Input
                placeholder="John Doe"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Project Lead">Project Lead</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Campaign Manager">Campaign Manager</SelectItem>
                  <SelectItem value="Content Writer">Content Writer</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddMemberModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              disabled={!newMember.name.trim()}
              className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
            >
              Invite Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Form Modal */}
      <Dialog open={isAddFormModalOpen} onOpenChange={setIsAddFormModalOpen}>
        <DialogContent className="sm:max-w-md dark:bg-dark-card-bg dark:border-dark-border">
          <DialogHeader>
            <DialogTitle>Add Form to Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Form Name *</label>
              <Input
                placeholder="e.g., Gala Ticket Sales"
                value={newForm.name}
                onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                className="dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Form Type</label>
              <Select value={newForm.type} onValueChange={(value) => setNewForm({ ...newForm, type: value })}>
                <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donation">Donation</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="auction">Auction</SelectItem>
                  <SelectItem value="sponsorship">Sponsorship</SelectItem>
                  <SelectItem value="membership">Membership</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddFormModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddForm}
              disabled={!newForm.name.trim()}
              className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
            >
              Add Form
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
