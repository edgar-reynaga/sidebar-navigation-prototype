"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faGear,
  faMoon,
  faCreditCard,
  faSignOutAlt,
  faFileAlt,
  faBook,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { faBrightness, faLayerGroup, faUser } from "@fortawesome/pro-solid-svg-icons"

const mockSearchResults = {
  topMatches: [
    { id: "tm1", title: "Dashboard Overview", category: "Page", icon: faFileAlt, type: "page" },
    { id: "tm2", title: "User Profile Settings", category: "Feature", icon: faGear, type: "feature" },
    { id: "tm3", title: "Annual Fundraising Form", category: "Form", icon: faFileAlt, type: "form" },
  ],
  suggested: [
    {
      id: "sg1",
      title: "How do I change my plan?",
      category: "Help Article",
      icon: faBook,
      type: "doc",
      external: true,
      url: "https://help.donate2.com/article/462-how-do-i-change-my-plan",
    },
    { id: "sg2", title: "Summer Gala Project", category: "Project", icon: faProjectDiagram, type: "project" },
    {
      id: "sg3",
      title: "Stripe Account Creation",
      category: "Documentation",
      icon: faBook,
      type: "doc",
      external: true,
      url: "https://help.donate2.com/article/607-stripe-account-creation",
    },
  ],
}

export function AppHeader() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const handleThemeToggle = () => {
    const currentEffectiveTheme = theme === "system" ? resolvedTheme : theme
    setTheme(currentEffectiveTheme === "dark" ? "light" : "dark")
  }

  const currentDisplayTheme = isMounted ? (theme === "system" ? resolvedTheme : theme) : "light"

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSearchResults(e.target.value.length > 1)
  }

  const handleSearchFocus = () => {
    if (searchQuery.length > 1) {
      setShowSearchResults(true)
    }
  }

  const SearchResultItem: React.FC<{ item: (typeof mockSearchResults.topMatches)[0] }> = ({ item }) => (
    <Link
      href={item.external ? item.url! : "#"}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm hover:bg-accent dark:hover:bg-dark-hover-bg"
      onClick={() => setShowSearchResults(false)}
    >
      <FontAwesomeIcon icon={item.icon} className="h-4 w-4 text-muted-foreground" />
      <div className="flex-grow">
        <span className="font-medium">{item.title}</span>
        <span className="ml-2 text-xs text-muted-foreground">({item.category})</span>
      </div>
      {item.external && <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-muted-foreground opacity-70" />}
    </Link>
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 dark:bg-dark-header-bg dark:border-dark-header-border">
      <div className="flex items-center flex-shrink-0 mr-6 min-w-[16rem]">
        <Link href="/" className="flex items-center gap-4">
          <div className="shrink-0 flex items-center justify-center w-auto">
            <svg className="size-8 text-white"  width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-slate-800 dark:fill-white" d="M8.4 14V12.5747L10.6667 10.9085C11.1385 10.5617 11.4154 10.3114 11.4154 10.0129C11.4154 9.65648 11.1693 9.42535 10.759 9.42535C10.4513 9.42535 10.0821 9.56023 10.0821 10.0899H8.4C8.4 8.74158 9.48709 8.00001 10.759 8.00001C12.0718 8.00001 13.0974 8.74158 13.0974 9.97432C13.0974 10.7448 12.4821 11.2938 11.5897 11.939L10.7077 12.5747H13.2V14H8.4Z" fill="none"/>
            <path d="M23.4 12.1088L19.4564 7.25272L15.5128 12.1088H17.8318C17.317 15.6295 14.4532 18.2964 10.9754 18.4939C7.49754 18.6914 4.3623 16.3652 3.46895 12.9245C2.57572 9.48369 4.17001 5.87497 7.28622 4.28439C10.4023 2.69381 14.1831 3.55887 16.3381 6.3556L16.1198 3.77304L18.6279 4.01548C15.3808 0.101984 9.88755 -0.936133 5.48576 1.5318C1.08397 3.99973 -1.01089 9.29231 0.473973 14.1939C1.95873 19.0954 6.61326 22.2526 11.6095 21.747C16.6058 21.2414 20.5642 17.2128 21.0797 12.1088H23.4Z" fill="#66CE93"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-slate-800 dark:text-dark-sidebar-foreground hidden sm:inline">
            Welsh National Opera
          </span>
        </Link>
      </div>

      <div className="flex-grow min-w-0 pl-4 justify-items-end">
        {" "}
        {/* Added pl-4 for more breathing room */}
        <div className="relative w-full max-w-lg">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search..."
            className="h-10 w-full rounded-lg border-gray-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/60 pl-10 pr-4 text-sm focus:ring-1 focus:ring-custom-green-icon-bg focus:border-custom-green-icon-bg dark:text-white"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
          />
          {showSearchResults && searchQuery && (
            <div className="absolute top-full mt-1.5 w-full rounded-lg border bg-popover p-2 text-popover-foreground shadow-lg dark:bg-dark-card-bg dark:border-dark-border max-h-[400px] overflow-y-auto custom-scrollbar">
              {mockSearchResults.topMatches.length > 0 && (
                <div className="mb-1">
                  <p className="text-xs font-semibold text-muted-foreground px-3 py-1">TOP MATCHES</p>
                  {mockSearchResults.topMatches.map((item) => (
                    <SearchResultItem key={item.id} item={item} />
                  ))}
                </div>
              )}
              {mockSearchResults.suggested.length > 0 && (
                <>
                  <DropdownMenuSeparator className="dark:bg-dark-border my-1" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground px-3 py-1 mt-1">SUGGESTED</p>
                    {mockSearchResults.suggested.map((item) => (
                      <SearchResultItem key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
              {mockSearchResults.topMatches.length === 0 && mockSearchResults.suggested.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No results found for "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto pl-4">
        {isMounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-hover-bg rounded-md"
          >
            <FontAwesomeIcon icon={currentDisplayTheme === "dark" ? faBrightness : faMoon} className="h-5 w-5" />
          </Button>
        )}
        <Link href="/account-settings" passHref legacyBehavior>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
            className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-hover-bg rounded-md"
          >
            <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-hover-bg"
              aria-label="User Profile"
            >
              <FontAwesomeIcon icon={faUser} className="h-[22px] w-[22px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 dark:bg-dark-card-bg dark:border-dark-border" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-dark-border" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="dark:focus:bg-dark-hover-bg cursor-pointer">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2 h-4 w-4" />
                <span>Payment Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:focus:bg-dark-hover-bg cursor-pointer">
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2 h-4 w-4" />
                <span>Plan Options</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="dark:bg-dark-border" />
            <DropdownMenuItem className="text-custom-status-error dark:text-custom-status-error dark:focus:bg-red-900/50 dark:focus:text-red-300 cursor-pointer">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
