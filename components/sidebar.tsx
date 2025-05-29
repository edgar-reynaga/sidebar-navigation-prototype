"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  BarChart3,
  Smartphone,
  Users,
  CreditCard,
  Ticket,
  GalleryVerticalEnd,
  Youtube,
  Users2Icon,
  Globe2,
  MessageSquareText,
  QrCodeIcon,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Repeat2,
  Sun,
  Moon,
  FolderKanban,
  Briefcase,
  Settings,
  FileText,
  UserCog,
  ShieldCheck,
} from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  active?: boolean
  isCollapsed: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, active, isCollapsed }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium group",
        "transition-colors duration-150",
        active
          ? "bg-custom-green-active-bg text-slate-800 dark:bg-dark-active-bg dark:text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-dark-sidebar-foreground dark:hover:bg-dark-hover-bg dark:hover:text-white",
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0",
          active
            ? "text-slate-700 dark:text-white"
            : "text-slate-500 dark:text-dark-sidebar-muted-foreground group-hover:text-slate-700 dark:group-hover:text-white",
        )}
      />
      {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
    </Link>
  )
}

interface IntegrationItemDisplayProps {
  icon: React.ElementType
  label: string
  isCollapsed: boolean
}

const IntegrationItemDisplay: React.FC<IntegrationItemDisplayProps> = ({ icon: Icon, label, isCollapsed }) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-dark-sidebar-foreground group",
        isCollapsed ? "justify-center" : "",
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 shrink-0 text-slate-500 dark:text-dark-sidebar-muted-foreground group-hover:text-slate-700 dark:group-hover:text-white" />
      {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
    </div>
  )
}

const pagesItems = [
  { href: "#", icon: LayoutGrid, label: "Dashboard", active: true },
  { href: "#", icon: BarChart3, label: "Reporting" },
  { href: "#", icon: Smartphone, label: "Forms" },
  { href: "#", icon: Users, label: "Team Fundraising" },
]

const projectItems = [
  { href: "#", icon: FolderKanban, label: "Active Projects" },
  { href: "#", icon: FileText, label: "Project Documents" },
  { href: "#", icon: Settings, label: "Project Settings" },
]

const managerItems = [
  { href: "#", icon: UserCog, label: "User Management" },
  { href: "#", icon: Briefcase, label: "Role Management" },
  { href: "#", icon: ShieldCheck, label: "Security Policies" },
]

const integrationItemsData = [
  { icon: CreditCard, label: "Stripe" },
  { icon: Ticket, label: "Tessitura" },
  { icon: GalleryVerticalEnd, label: "Brightcove Gallery" },
  { icon: Youtube, label: "Brightcove Beacon" },
  { icon: Users2Icon, label: "Prospect2" },
  { icon: Globe2, label: "Google" },
  { icon: MessageSquareText, label: "Twilio" },
  { icon: QrCodeIcon, label: "QR Code" },
  { icon: Users, label: "Another Integration" },
  { icon: Settings, label: "Settings Integration" },
]
const INITIAL_INTEGRATIONS_VISIBLE = 5

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [openSections, setOpenSections] = useState<string[]>(["pages"])
  const [showAllIntegrations, setShowAllIntegrations] = useState(false)

  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    if (isCollapsed) {
      setOpenSections([])
      setShowAllIntegrations(false)
    } else {
      if (openSections.length === 0 && !isCollapsed) {
        setOpenSections(["pages"])
      }
    }
  }, [isCollapsed])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const handleThemeToggle = () => {
    const currentEffectiveTheme = theme === "system" ? resolvedTheme : theme
    console.log("[SidebarThemeToggle] Current theme (from useTheme hook):", theme)
    console.log("[SidebarThemeToggle] Resolved theme (actual applied by next-themes):", resolvedTheme)
    console.log("[SidebarThemeToggle] Effective theme for toggle decision:", currentEffectiveTheme)

    const newTheme = currentEffectiveTheme === "dark" ? "light" : "dark"
    console.log("[SidebarThemeToggle] Attempting to set theme to:", newTheme)
    setTheme(newTheme)
  }

  if (!isMounted) return null

  const currentDisplayTheme = theme === "system" ? resolvedTheme : theme
  if (isMounted) {
    console.log(
      "[SidebarThemeIcon] theme:",
      theme,
      "resolvedTheme:",
      resolvedTheme,
      "currentDisplayTheme for icon:",
      currentDisplayTheme,
    )
  }

  const renderSection = (
    title: string,
    sectionKey: string,
    items: Array<Omit<NavItemProps, "isCollapsed" | "active"> & { active?: boolean }>,
    ItemComponent: React.FC<NavItemProps>,
  ) => (
    <AccordionItem value={sectionKey} className="border-none">
      {!isCollapsed && (
        <AccordionTrigger className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-dark-sidebar-muted-foreground uppercase tracking-wider hover:no-underline hover:bg-slate-100 dark:hover:bg-dark-hover-bg rounded-md group">
          <div className="flex items-center justify-between w-full">
            <span>{title}</span>
          </div>
        </AccordionTrigger>
      )}
      {isCollapsed &&
        items
          .slice(0, 1)
          .map((item) => <ItemComponent key={item.label} {...item} isCollapsed={isCollapsed} active={item.active} />)}
      <AccordionContent className={cn(isCollapsed ? "hidden" : "pt-1")}>
        <nav className="space-y-1">
          {items.map((item) => (
            <ItemComponent key={item.label} {...item} isCollapsed={isCollapsed} active={item.active} />
          ))}
        </nav>
      </AccordionContent>
    </AccordionItem>
  )

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-custom-sidebar-bg dark:bg-dark-sidebar-bg border-r border-slate-200 dark:border-dark-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "absolute top-[50px] z-10 h-7 w-7 rounded-full bg-background dark:bg-dark-sidebar-bg border-slate-300 dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-hover-bg",
          isCollapsed ? "-right-3.5" : "-right-3.5",
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className="p-4 flex items-center space-x-3 border-b border-slate-200 dark:border-dark-border min-h-[65px]">
        <div className="bg-custom-green-icon-bg p-1.5 rounded-full shrink-0">
          <Repeat2 className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <span
            className={cn(
              "font-semibold text-slate-800 dark:text-dark-sidebar-foreground whitespace-nowrap overflow-hidden transition-opacity duration-300 ease-in-out",
              isCollapsed ? "opacity-0" : "opacity-100",
            )}
          >
            Welsh National Opera
          </span>
        )}
      </div>

      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-1">
        <Accordion type="multiple" className="w-full space-y-1" value={openSections} onValueChange={setOpenSections}>
          {renderSection("Pages", "pages", pagesItems, NavItem)}
          {renderSection("Projects", "projects", projectItems, NavItem)}
          {renderSection("Managers", "managers", managerItems, NavItem)}

          <AccordionItem value="integrations" className="border-none">
            {!isCollapsed && (
              <AccordionTrigger className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-dark-sidebar-muted-foreground uppercase tracking-wider hover:no-underline hover:bg-slate-100 dark:hover:bg-dark-hover-bg rounded-md group">
                <div className="flex items-center justify-between w-full">
                  <span>Integrations</span>
                </div>
              </AccordionTrigger>
            )}
            {isCollapsed &&
              integrationItemsData
                .slice(0, INITIAL_INTEGRATIONS_VISIBLE)
                .map((item) => <IntegrationItemDisplay key={item.label} {...item} isCollapsed={isCollapsed} />)}
            <AccordionContent className={cn(isCollapsed ? "hidden" : "pt-1")}>
              <nav className="space-y-1">
                {integrationItemsData
                  .slice(0, showAllIntegrations ? integrationItemsData.length : INITIAL_INTEGRATIONS_VISIBLE)
                  .map((item) => (
                    <IntegrationItemDisplay key={item.label} {...item} isCollapsed={isCollapsed} />
                  ))}
                {!isCollapsed && integrationItemsData.length > INITIAL_INTEGRATIONS_VISIBLE && (
                  <Button
                    variant="link"
                    className="w-full justify-start px-3 py-2 text-sm text-custom-green-icon-bg hover:text-green-700 dark:text-custom-green-button-bg dark:hover:text-green-300"
                    onClick={() => setShowAllIntegrations(!showAllIntegrations)}
                  >
                    {showAllIntegrations
                      ? "Show Less"
                      : `Show More (${integrationItemsData.length - INITIAL_INTEGRATIONS_VISIBLE})`}
                  </Button>
                )}
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className={cn("mt-auto p-4 border-t border-slate-200 dark:border-dark-border", isCollapsed && "pt-2")}>
        {!isCollapsed && (
          <div className="bg-white dark:bg-dark-card-bg p-4 rounded-lg border border-slate-200 dark:border-dark-border shadow-sm">
            <MessageSquare className="h-6 w-6 text-slate-500 dark:text-dark-sidebar-muted-foreground mb-2" />
            <h4 className="font-semibold text-slate-800 dark:text-dark-sidebar-foreground mb-0.5">Need help?</h4>
            <p className="text-sm text-slate-600 dark:text-dark-sidebar-muted-foreground mb-3">
              Instant answers to your questions
            </p>
            <Button className="w-full bg-custom-green-button-bg hover:bg-green-500 text-slate-800 dark:bg-dark-button-bg dark:text-dark-button-text dark:hover:bg-green-600 font-medium">
              Start a conversation
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={handleThemeToggle}
          className={cn(
            "w-full text-slate-600 dark:text-dark-sidebar-muted-foreground hover:bg-slate-100 dark:hover:bg-dark-hover-bg",
            isCollapsed ? "rounded-full h-10 w-10 mx-auto mt-2" : "mt-2 flex items-center justify-center space-x-2",
          )}
          aria-label="Toggle theme"
        >
          {currentDisplayTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          {!isCollapsed && <span>Toggle Theme</span>}
        </Button>
      </div>
    </div>
  )
}
