"use client"

import { useState } from "react"
import { AppHeader } from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faPlus,
  faDownload,
  faEllipsisV,
  faList,
  faEye,
  faEdit,
  faCopy,
  faArchive,
  faClone,
  faChevronLeft,
  faChevronRight,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faFilter,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

// Mock data for forms
const formsData = [
  {
    id: "1",
    name: "Guthrie Theater Fixed Packages",
    status: "active",
    type: "subscription",
    source: "website",
    channel: "email",
    receipt: "disabled",
    amount: "$67,632.39",
    modified: "2 hours ago",
    description: "Fixed package donations for 2023-2024 theater season",
    totalDonations: 85,
    conversionRate: 12.5,
  },
]

const archivedForms = [
  {
    id: "6",
    name: "Old Holiday Campaign",
    status: "archived",
    type: "donation",
    source: "email",
    channel: "newsletter",
    receipt: "enabled",
    amount: "$25,000.00",
    modified: "2 weeks ago",
    description: "Previous year holiday campaign",
    totalDonations: 120,
    conversionRate: 7.5,
  },
]

export default function FormsPage() {
  const [activeTab, setActiveTab] = useState("listing")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const currentData = activeTab === "listing" ? formsData : archivedForms
  const totalPages = Math.ceil(currentData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentForms = currentData.slice(startIndex, endIndex)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500" />
      case "paused":
        return <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <FontAwesomeIcon icon={faTimesCircle} className="h-4 w-4 text-gray-500" />
      case "archived":
        return <FontAwesomeIcon icon={faArchive} className="h-4 w-4 text-red-500" />
      default:
        return <FontAwesomeIcon icon={faTimesCircle} className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      archived: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500",
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-dark-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 bg-white dark:bg-dark-background overflow-y-auto custom-scrollbar">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">Forms</h1>
              <p className="text-muted-foreground dark:text-slate-400">
                Manage your donation forms, track performance, and create new campaigns.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-2" />
                Export Form Information
              </Button>
              <Button className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium">
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                New Form
              </Button>
            </div>
          </div>

          {/* Tabs and Filters */}
          <Card className="mb-8 dark:bg-dark-card-bg dark:border-slate-700">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList className="grid w-fit grid-cols-2">
                    <TabsTrigger value="listing" className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                      Listing ({formsData.length})
                    </TabsTrigger>
                    <TabsTrigger value="archives" className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faArchive} className="h-4 w-4" />
                      Archives ({archivedForms.length})
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Search forms..."
                    className="pl-10 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="donation">Donation</SelectItem>
                    <SelectItem value="membership">Membership</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="secondary"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200"
                >
                  <FontAwesomeIcon icon={faFilter} className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Forms List */}
          <div className="space-y-4 mb-8">
            {currentForms.map((form) => (
              <Card key={form.id} className="dark:bg-dark-card-bg dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(form.status)}
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">{form.name}</h3>
                        <Badge className={cn("text-xs", getStatusBadge(form.status))}>{form.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">{form.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-slate-400">
                        <span>Type: {form.type}</span>
                        <span>•</span>
                        <span>Source: {form.source}</span>
                        <span>•</span>
                        <span>Modified: {form.modified}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FontAwesomeIcon icon={faEye} className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FontAwesomeIcon icon={faClone} className="h-4 w-4 mr-2" />
                          Clone
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FontAwesomeIcon icon={faCopy} className="h-4 w-4 mr-2" />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <FontAwesomeIcon icon={faArchive} className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Total Amount</p>
                      <p className="text-lg font-semibold text-foreground dark:text-white">{form.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Donations</p>
                      <p className="text-lg font-semibold text-foreground dark:text-white">{form.totalDonations}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Conversion</p>
                      <p className="text-lg font-semibold text-foreground dark:text-white">{form.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Channel</p>
                      <p className="text-sm text-foreground dark:text-white capitalize">{form.channel}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Receipt</p>
                      <Badge
                        variant={form.receipt === "enabled" ? "default" : "secondary"}
                        className={cn(
                          "text-xs",
                          form.receipt === "enabled"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-500",
                        )}
                      >
                        {form.receipt}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        size="sm"
                        className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Card className="dark:bg-dark-card-bg dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground dark:text-slate-400">
                  Showing {startIndex + 1} to {Math.min(endIndex, currentData.length)} of {currentData.length} forms
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="dark:border-slate-600 dark:text-slate-300"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "w-8 h-8 p-0",
                          currentPage === page
                            ? "bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900"
                            : "dark:border-slate-600 dark:text-slate-300",
                        )}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="dark:border-slate-600 dark:text-slate-300"
                  >
                    Next
                    <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
