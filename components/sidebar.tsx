"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ChatPopup } from "./chat-popup"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faChartSimple,
  faMobileNotch,
  faUserGroup,
  faGlobe,
  faQrcode,
  faCircleQuestion,
  faChevronLeft,
  faChevronRight,
  faUserGear,
  faGrid2,
  faRectangleHistory,
  faMemo,
  faEnvelope,
  faPenToSquare,
  faFileInvoiceDollar,
  faPersonToPortal
} from "@fortawesome/pro-solid-svg-icons"
import { faGoogle, faStripeS, faVimeoV } from "@fortawesome/free-brands-svg-icons"
import { faCircleStop, faWrench } from "@fortawesome/free-solid-svg-icons"

interface NavItemProps {
  href: string
  icon: any
  label: string
  active?: boolean
  isCollapsed: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, active, isCollapsed }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium group",
        "transition-colors duration-150",
        active
          ? "bg-custom-green-active-bg text-slate-800 dark:bg-dark-active-bg dark:text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-dark-sidebar-foreground dark:hover:bg-dark-hover-bg dark:hover:text-white",
        isCollapsed && "justify-center px-0", // Center icon when collapsed
      )}
      title={isCollapsed ? label : undefined}
    >
      <FontAwesomeIcon
        icon={icon}
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

const pagesItems = [
  { href: "#", icon: faGrid2, label: "Dashboard", active: true },
  { href: "#", icon: faChartSimple, label: "Reporting" },
  { href: "#", icon: faMobileNotch, label: "Forms" },
  { href: "#", icon: faUserGroup, label: "Team Fundraising" },
]

const projectItems = [
  { href: "#", icon: faRectangleHistory, label: "Active Projects" },
  { href: "#", icon: faMemo, label: "Project Documents" },
  { href: "#", icon: faWrench, label: "Project Settings" },
]

const managerItems = [
  { href: "#", icon: faGlobe, label: "Domain Manager" },
  { href: "#", icon: faUserGear, label: "User Manager" },
  { href: "#", icon: faEnvelope, label: "Message Manager" },
  { href: "#", icon: faPenToSquare, label: "Presentation Manager" },
  { href: "#", icon: faFileInvoiceDollar, label: "Payment Manager" },
  { href: "#", icon: faPersonToPortal, label: "Customer Portal Manager" },
]

const integrationItemsData = [
  { href: "#", icon: faStripeS, label: "Stripe" },
  { href: "#", icon: faCircleStop, label: "Tessitura" },
  { href: "#", icon: faCircleStop, label: "Brightcove Gallery" },
  { href: "#", icon: faCircleStop, label: "Brightcove Beacon" },
  { href: "#", icon: faCircleStop, label: "Prospect2" },
  { href: "#", icon: faGoogle, label: "Google" },
  { href: "#", icon: faVimeoV, label: "Vimeo" },
  { href: "#", icon: faCircleStop, label: "Twilio" },
  { href: "#", icon: faQrcode, label: "QR Code" },
]
const INITIAL_INTEGRATIONS_VISIBLE = 5

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(["pages"]) // Persists user's accordion selection
  const [showAllIntegrations, setShowAllIntegrations] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    if (isCollapsed) {
      setShowAllIntegrations(false) // Reset "Show More" for integrations list
    }
    // No direct manipulation of openSections here to preserve its state.
  }, [isCollapsed])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  // Helper to render a section for the expanded Accordion view
  const renderAccordionSection = (
    title: string,
    sectionKey: string,
    items: Array<Omit<NavItemProps, "isCollapsed" | "active"> & { active?: boolean }>,
  ) => (
    <AccordionItem value={sectionKey} className="border-none">
      <AccordionTrigger className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-dark-sidebar-muted-foreground uppercase tracking-wider hover:no-underline hover:bg-slate-100 dark:hover:bg-dark-hover-bg rounded-md group">
        <div className="flex items-center justify-between w-full">
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1">
        <nav className="space-y-1">
          {items.map((item) => (
            <NavItem key={item.label} {...item} isCollapsed={false} active={item.active} />
          ))}
        </nav>
      </AccordionContent>
    </AccordionItem>
  )

  // Helper to render integrations section for the expanded Accordion view
  const renderAccordionIntegrationsSection = () => {
    const itemsToDisplay = showAllIntegrations
      ? integrationItemsData
      : integrationItemsData.slice(0, INITIAL_INTEGRATIONS_VISIBLE)
    return (
      <AccordionItem value="integrations" className="border-none">
        <AccordionTrigger className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-dark-sidebar-muted-foreground uppercase tracking-wider hover:no-underline hover:bg-slate-100 dark:hover:bg-dark-hover-bg rounded-md group">
          <div className="flex items-center justify-between w-full">
            <span>Integrations</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1">
          <nav className="space-y-1">
            {itemsToDisplay.map((item) => (
              <NavItem key={item.label} {...item} isCollapsed={false} />
            ))}
            {integrationItemsData.length > INITIAL_INTEGRATIONS_VISIBLE && (
              <Button
                variant="link"
                className="w-full justify-start px-3 py-2 text-sm text-custom-button-primary hover:text-custom-button-primary-hover dark:text-custom-button-primary dark:hover:text-custom-button-primary-hover/80"
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
    )
  }

  const hasOpenSectionsOtherThanPages = openSections.some(
    (sec) =>
      sec !== "pages" &&
      ((sec === "projects" && projectItems.length > 0) ||
        (sec === "managers" && managerItems.length > 0) ||
        (sec === "integrations" && integrationItemsData.length > 0)),
  )

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col h-full bg-custom-sidebar-bg dark:bg-dark-sidebar-bg border-r border-slate-200 dark:border-dark-border transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-72",
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "absolute top-[20px] z-20 h-7 w-7 rounded-full bg-background dark:bg-dark-sidebar-bg border-slate-300 dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-hover-bg",
            isCollapsed ? "-right-3.5" : "-right-3.5",
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="size-2" />
        </Button>

        <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar">
          {isCollapsed ? (
            // Collapsed View: Render icons directly
            <div className="space-y-0.5 p-4 pt-8">
              {/* Pages Section Icons (Always Visible) */}
              {pagesItems.map((item) => (
                <NavItem
                  key={`collapsed-${item.label}`}
                  {...item}
                  isCollapsed={true}
                  active={!!item.active && openSections.includes("pages")}
                />
              ))}

              {/* Separator if Pages icons are shown and other open sections follow */}
              {pagesItems.length > 0 && hasOpenSectionsOtherThanPages && (
                <div className="py-1.5">
                  <hr className="border-slate-200 dark:border-dark-border/50 mx-2" />
                </div>
              )}

              {/* Projects Section Icons (If Open) */}
              {openSections.includes("projects") &&
                projectItems.map((item) => (
                  <NavItem
                    key={`collapsed-${item.label}`}
                    {...item}
                    isCollapsed={true}
                    active={!!item.active && openSections.includes("projects")}
                  />
                ))}

              {/* Separator if Projects icons are shown and other open sections follow */}
              {openSections.includes("projects") &&
                projectItems.length > 0 &&
                (openSections.includes("managers") || openSections.includes("integrations")) && (
                  <div className="py-1.5">
                    <hr className="border-slate-200 dark:border-dark-border/50 mx-2" />
                  </div>
                )}

              {/* Managers Section Icons (If Open) */}
              {openSections.includes("managers") &&
                managerItems.map((item) => (
                  <NavItem
                    key={`collapsed-${item.label}`}
                    {...item}
                    isCollapsed={true}
                    active={!!item.active && openSections.includes("managers")}
                  />
                ))}

              {/* Separator if Managers icons are shown and Integrations icons follow */}
              {openSections.includes("managers") &&
                managerItems.length > 0 &&
                openSections.includes("integrations") && (
                  <div className="py-1.5">
                    <hr className="border-slate-200 dark:border-dark-border/50 mx-2" />
                  </div>
                )}

              {/* Integrations Section Icons (If Open) */}
              {openSections.includes("integrations") &&
                integrationItemsData.map((item) => (
                  <NavItem
                    key={`collapsed-${item.label}`}
                    {...item}
                    isCollapsed={true}
                    // Assuming integration items don't have an 'active' state like pages
                    active={false}
                  />
                ))}
            </div>
          ) : (
            // Expanded View: Render Accordion
            <div className="p-4 pt-8 space-y-1">
              <Accordion
                type="multiple"
                className="w-full space-y-1"
                value={openSections}
                onValueChange={setOpenSections}
              >
                {renderAccordionSection("Pages", "pages", pagesItems)}
                {renderAccordionSection("Projects", "projects", projectItems)}
                {renderAccordionSection("Managers", "managers", managerItems)}
                {renderAccordionIntegrationsSection()}
              </Accordion>
            </div>
          )}
        </div>

        {/* Help Section (Unchanged) */}
        <div className={cn("mt-auto p-4 border-t border-slate-200 dark:border-dark-border")}>
          {isCollapsed ? (
            <div
              className="flex justify-center items-center h-[38px] rounded-md cursor-pointer group hover:bg-slate-100 dark:hover:bg-dark-hover-bg transition-colors"
              title="Need help?"
              onClick={() => setIsChatOpen(true)}
            >
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="h-6 w-6 text-slate-500 dark:text-dark-sidebar-muted-foreground group-hover:text-slate-700 dark:group-hover:text-white transition-colors"
              />
            </div>
          ) : (
            <div
              className={cn(
                "bg-white dark:bg-dark-card-bg rounded-lg border border-slate-200 dark:border-slate-700",
                "p-4 flex flex-col items-start overflow-hidden",
              )}
            >
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="h-6 w-6 text-slate-500 dark:text-dark-sidebar-muted-foreground shrink-0 mb-2"
                title="Need help?"
              />
              <div
                className={cn(
                  "w-full transition-all duration-200 ease-in-out",
                  isCollapsed ? "opacity-0 max-h-0 invisible" : "opacity-100 max-h-[170px] visible delay-100",
                )}
              >
                <h4 className="font-semibold text-slate-800 dark:text-dark-sidebar-foreground mb-0.5">Need help?</h4>
                <p className="text-sm text-slate-600 dark:text-dark-sidebar-muted-foreground mb-3">
                  Instant answers to your questions
                </p>
                <Button
                  className="w-full bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 dark:text-slate-900 font-medium"
                  onClick={() => setIsChatOpen(true)}
                >
                  Start a conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
