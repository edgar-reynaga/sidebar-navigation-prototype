"use client"

import { useState } from "react"
import { AppHeader } from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faFilter,
  faDownload,
  faChevronLeft,
  faChevronRight,
  faEllipsisV,
  faEye,
  faEdit,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

// Mock data for the reporting page
const reportingSummary = {
  totalRevenue: 229087.02,
  totalQuantity: 1613,
  averageDonation: 142.03,
  coverCostPercentage: 10.66,
  digitalWalletPercentage: 16.31,
  digitalWalletStats: {
    googlePay: 178,
    link: 84,
    cashApp: 1,
  },
}

const formsData = [
  {
    id: "1",
    name: "Guthrie Theater 6-Play Fixed Package",
    formId: "SE16TR",
    revenue: 67632.39,
    quantity: 85,
    average: 795.68,
    coverCostCount: 32,
    coverCostPercentage: 37.65,
    coverCostAmount: 3240.39,
    digitalWalletCount: 32,
    digitalWalletPercentage: 37.65,
    status: "Active",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Test donation",
    formId: "IsWKSS",
    revenue: 63300.0,
    quantity: 51,
    average: 1241.18,
    coverCostCount: 0,
    coverCostPercentage: 0.0,
    coverCostAmount: 0.0,
    digitalWalletCount: 9,
    digitalWalletPercentage: 17.65,
    status: "Active",
    lastActivity: "1 day ago",
  },
  {
    id: "3",
    name: "New Package Features",
    formId: "Mr6evI",
    revenue: 30145.1,
    quantity: 15,
    average: 2009.67,
    coverCostCount: 7,
    coverCostPercentage: 46.67,
    coverCostAmount: 897.45,
    digitalWalletCount: 3,
    digitalWalletPercentage: 20.0,
    status: "Active",
    lastActivity: "3 days ago",
  },
  {
    id: "4",
    name: "Seattle Symphony",
    formId: "HhBnkx",
    revenue: 16035.81,
    quantity: 337,
    average: 47.58,
    coverCostCount: 0,
    coverCostPercentage: 0.0,
    coverCostAmount: 0.0,
    digitalWalletCount: 44,
    digitalWalletPercentage: 13.06,
    status: "Active",
    lastActivity: "5 days ago",
  },
  {
    id: "5",
    name: "Annual Membership Drive",
    formId: "AM2024",
    revenue: 45200.0,
    quantity: 128,
    average: 353.13,
    coverCostCount: 15,
    coverCostPercentage: 11.72,
    coverCostAmount: 1205.0,
    digitalWalletCount: 22,
    digitalWalletPercentage: 17.19,
    status: "Archived",
    lastActivity: "1 week ago",
  },
{
    id: "6",
    name: "Annual Membership Drive",
    formId: "AM2024",
    revenue: 45200.0,
    quantity: 128,
    average: 353.13,
    coverCostCount: 15,
    coverCostPercentage: 11.72,
    coverCostAmount: 1205.0,
    digitalWalletCount: 22,
    digitalWalletPercentage: 17.19,
    status: "Archived",
    lastActivity: "1 week ago",
  },
]

export default function ReportingPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [formType, setFormType] = useState("all")
  const [dateRange, setDateRange] = useState("")
  const [sortBy, setSortBy] = useState("")

  const itemsPerPage = 5
  const totalPages = Math.ceil(formsData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentForms = formsData.slice(startIndex, endIndex)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(2)}%`
  }

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-dark-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 bg-white dark:bg-dark-background overflow-y-auto custom-scrollbar">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">Reporting</h1>
            <p className="text-muted-foreground dark:text-slate-400">
              Track your fundraising performance and analyze donation patterns across all forms.
            </p>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="dark:bg-dark-card-bg dark:border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-slate-400">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground dark:text-white">
                  {formatCurrency(reportingSummary.totalRevenue)}
                </div>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1">
                  {reportingSummary.totalQuantity.toLocaleString()} donations
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-dark-card-bg dark:border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-slate-400">
                  Average Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground dark:text-white">
                  {formatCurrency(reportingSummary.averageDonation)}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-dark-card-bg dark:border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-slate-400">
                  Cover Cost Adoption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground dark:text-white">
                  {formatPercentage(reportingSummary.coverCostPercentage)}
                </div>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1">Of all donations</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-dark-card-bg dark:border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-slate-400">
                  Digital Wallet Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground dark:text-white">
                  {formatPercentage(reportingSummary.digitalWalletPercentage)}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Google Pay: {reportingSummary.digitalWalletStats.googlePay}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

                    {/* Filters Section */}
          <Card className="border-0 shadow-none mb-8 dark:bg-dark-card-bg dark:border-slate-700">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
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
                <Select value={formType} onValueChange={setFormType}>
                  <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                    <SelectValue placeholder="Form Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="donation">Quick Donation</SelectItem>
                    <SelectItem value="membership">Enhanced Donation</SelectItem>
                    <SelectItem value="event">Team Fundraising</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 days</SelectItem>
                    <SelectItem value="last-year">Last year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="quantity">Quantity</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Forms Table */}
          <Card className="mb-8 border-0 shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                {currentForms.map((form) => (
                  <Card key={form.id} className="border dark:border-slate-600">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground dark:text-white">{form.name}</h3>
                            <Badge
                              variant={form.status === "Active" ? "default" : "secondary"}
                              className={cn(
                                form.status === "Active"
                                  ? "bg-custom-status-success-bg text-custom-status-success"
                                  : "bg-red-100 text-red-600",
                              )}
                            >
                              {form.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Form ID: {form.formId} • Last activity: {form.lastActivity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FontAwesomeIcon icon={faEllipsisV} className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Revenue</p>
                          <p className="text-lg font-semibold text-foreground dark:text-white">
                            {formatCurrency(form.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Quantity</p>
                          <p className="text-lg font-semibold text-foreground dark:text-white">{form.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Average</p>
                          <p className="text-lg font-semibold text-foreground dark:text-white">
                            {formatCurrency(form.average)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Cover Cost</p>
                          <p className="text-lg font-semibold text-foreground dark:text-white">
                            {form.coverCostCount} ({formatPercentage(form.coverCostPercentage)})
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            {formatCurrency(form.coverCostAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">
                            Digital Wallet
                          </p>
                          <p className="text-lg font-semibold text-foreground dark:text-white">
                            {form.digitalWalletCount} ({formatPercentage(form.digitalWalletPercentage)})
                          </p>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button
                            size="sm"
                            className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                          >
                            View Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t dark:border-slate-600">
                <div className="text-sm text-muted-foreground dark:text-slate-400">
                  Showing {startIndex + 1} to {Math.min(endIndex, formsData.length)} of {formsData.length} forms
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
