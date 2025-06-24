"use client"

import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { AppHeader } from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLightbulb,
  faSyncAlt,
  faChevronRight,
  faTimes,
  faPhone,
  faExternalLinkAlt,
  faChevronDown,
  faQuestionCircle,
  faBook,
  faSearch,
} from "@fortawesome/free-solid-svg-icons" 
import { cn } from "@/lib/utils"

const allFeaturesData = [
  {
    id: "feat1",
    date: "July 1, 2020",
    title: "Google Analytics - Enhanced Ecommerce",
    description:
      "To further our Google Analytics Integration, we have added support for Ecommerce and Enhanced Ecommerce. When you view your reporting you will see Ecommerce events throughout. You will see data in Realtime Reports, Behavior Reports, and most importantly Conversions Reports - Ecommerce.",
    learnMoreLink: "#",
  },
  {
    id: "feat2",
    date: "June 24, 2020",
    title: "Personalized Ask & Personalized Forms",
    description:
      "Personalize your donors email with a button that loads a Donate2 form with a Personalized Ask amount using our supported URL parameters. Also pre-populate the credit card form with the first name, last name, and email making it even easier for your donor to give. If that's not enough personalization for you, you can even create your own URL parameters for more customization.",
    learnMoreLink: "#",
  },
  {
    id: "feat3",
    date: "June 24, 2020",
    title: "Prospect2/ActiveCampaign Marketing Communication",
    description:
      "You can provide donors the ability to opt-in to your marketing communications with the tap or click of a checkbox while making their donation. They will be subscribed to a List of your choice and tagged so you can send them an email, trigger an Automation, or any of the other really cool things you can do in Pro2/AC.",
    learnMoreLink: "#",
  },
  {
    id: "feat4",
    date: "June 24, 2020",
    title: "Google Analytics",
    description:
      "Donate2 supports the ability to set a Property ID for reporting back to your Google Analytics. Enter the Property ID, click save, and look for data in Google Analytics.",
    learnMoreLink: "#",
  },
  {
    id: "feat5",
    date: "June 8, 2020",
    title: "Prospect2/ActiveCampaign Deep Data",
    description:
      "Donate2 E-commerce data can be reported back into Prospect2/ActiveCampaign for reporting on the Marketing Revenue Report, attribution to email Campaigns, and attribution to Automations. This data can be used for personalization and segmentation in Campaigns and Automations. This is available on the Gold/Plus plans and higher. Donate2 E-commerce data can be reported back into Prospect2/ActiveCampaign for reporting on the Marketing Revenue Report, attribution to email Campaigns, and attribution to Automations. This data can be used for personalization and segmentation in Campaigns and Automations. This is available on the Gold/Plus plans and higher.",
    learnMoreLink: "#",
  },
]

const templateData = [
  {
    id: "template1",
    title: "Annual Membership",
    description:
      "Perfect for organizations looking to build recurring revenue through annual memberships. Includes automated renewal reminders and member benefits tracking.",
    benefits: ["Recurring payments", "Member portal", "Automated emails"],
    category: "Membership",
  },
  {
    id: "template2",
    title: "Event Registration",
    description:
      "Streamlined registration for galas, fundraising events, and special occasions. Handles ticket sales, seating preferences, and dietary requirements.",
    benefits: ["Ticket management", "Seating charts", "Guest preferences"],
    category: "Events",
  },
  {
    id: "template3",
    title: "General Donation",
    description:
      "A versatile donation form that works for any cause. Customizable giving levels, tribute options, and donor recognition features included.",
    benefits: ["Flexible amounts", "Tribute gifts", "Donor recognition"],
    category: "Fundraising",
  },
]

const commonIssuesData = [
  {
    id: "issue1",
    question: "Why aren't my donations showing up in my reports?",
    answer:
      "This is usually due to timezone settings or report date ranges. Check your account timezone settings and ensure your date range includes the transaction dates.",
    helpUrl: "https://help.donate2.com/",
  },
  {
    id: "issue2",
    question: "How do I customize my donation form colors and branding?",
    answer:
      "You can customize your form appearance in the Presentation Manager. Access it from the sidebar and choose from pre-built themes or create custom CSS.",
    helpUrl: "https://help.donate2.com/",
  },
  {
    id: "issue3",
    question: "My Stripe integration isn't working properly",
    answer:
      "Ensure your Stripe API keys are correctly entered and that your Stripe account is fully activated. Check the webhook settings in your Stripe dashboard.",
    helpUrl: "https://help.donate2.com/",
  },
  {
    id: "issue4",
    question: "How do I set up recurring donations?",
    answer:
      "Recurring donations are configured in your form settings. Enable the 'Allow Recurring' option and set your preferred intervals (monthly, quarterly, annually).",
    helpUrl: "https://help.donate2.com/",
  }
]

export default function HomePage() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)
  const [showIntegrationBanner, setShowIntegrationBanner] = useState(true)
  const [openIssues, setOpenIssues] = useState<string[]>([])

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    setSlideCount(allFeaturesData.length)
    setCurrentSlide(carouselApi.selectedScrollSnap())

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  const toggleIssue = (issueId: string) => {
    setOpenIssues((prev) => (prev.includes(issueId) ? prev.filter((id) => id !== issueId) : [...prev, issueId]))
  }

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-dark-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 bg-white dark:bg-dark-background overflow-y-auto custom-scrollbar">

          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-foreground dark:text-slate-100">Hi Stephen, Welcome back!</h1>
            <p className="text-muted-foreground dark:text-slate-400 mt-2">
              This Dashboard will evolve over time with new tools and information. If you have an idea for a new feature or integration please use the{" "} <a href="#" className="underline underline-offset-2 font-semibold">suggestion form</a>.
            </p>
          </div>

          {/* Integration Banner */}
          {showIntegrationBanner && (
            <div className="mb-8 bg-gradient-to-b from-[#E3ECF2] to-[#FCFDFD] dark:from-[#243B4C] dark:to-[#315067] border border-[#BDD1E0] dark:border-[#315067] rounded-lg p-6 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowIntegrationBanner(false)}
                className="absolute top-4 right-4 h-6 w-6 text-[#243B4C] dark:text-[#BDD1E0]"
              >
                <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
              </Button>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-auto flex items-center justify-center">
                  <div className="h-auto w-16">
                  <svg viewBox="0 0 96 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M49.4237 2.98397C50.4938 2.2288 51.9803 2.78012 52.2955 4.0483L62.0833 43.4293C62.4063 44.7298 61.2687 46.0096 59.9086 45.931L59.776 45.9197C53.8653 45.1966 43.4865 44.6825 33.8321 45.5181L32.9005 45.6038C30.1696 45.8665 27.43 46.2497 24.8673 46.5428C22.2927 46.8372 19.8817 47.0423 17.7541 46.9603C15.6238 46.8782 13.8146 46.509 12.4215 45.6835C11.0437 44.867 10.0416 43.5861 9.54954 41.6064L7.51085 33.4038C7.02242 31.4386 7.37668 29.7256 8.31455 28.1837C9.2602 26.6291 10.806 25.2392 12.7087 23.9601C16.0483 21.715 20.3768 19.8796 24.2614 18.1001L25.8948 17.3399C33.7081 13.6287 41.7753 8.30674 47.2459 4.50939L49.4237 2.98397Z" fill="#17492D" stroke="#17492D" strokeWidth="0.75"/>
                  <path d="M20.5728 45.5129L27.1767 45.1473C27.659 45.1206 28.0998 45.407 28.2741 45.8499L28.3052 45.9401L35.0865 68.7013C35.272 69.3246 34.8859 69.9733 34.2495 70.1076L24.4306 72.1796C23.8413 72.3038 23.268 71.9379 23.1224 71.3678L23.0998 71.2508L19.5326 46.7843C19.4444 46.1776 19.8622 45.6228 20.4528 45.5262L20.5728 45.5129Z" fill="#17492D" stroke="#17492D" strokeWidth="0.75"/>
                  <path d="M18.8656 45.935L25.4695 45.5694C25.9518 45.5427 26.3926 45.8292 26.5669 46.272L26.5979 46.3623L33.3793 69.1234C33.5648 69.7467 33.1786 70.3954 32.5423 70.5297L22.7234 72.6017C22.1341 72.7259 21.5608 72.36 21.4152 71.7899L21.3925 71.6729L17.8254 47.2064C17.7372 46.5998 18.1549 46.0449 18.7456 45.9483L18.8656 45.935Z" fill="#8BDAAD" stroke="#17492D" strokeWidth="0.75"/>
                  <mask id="path-4-inside-1_20_417" fill="white">
                  <path d="M52.9793 16.0358C56.5919 15.1381 60.4451 18.1309 61.586 22.7207C62.7268 27.3107 60.7233 31.76 57.1106 32.6581C56.3765 32.8405 55.6325 32.8604 54.9033 32.7408C54.1024 30.2996 53.3474 27.6792 52.666 24.9377C51.9846 22.196 51.425 19.5274 50.9898 16.9952C51.5781 16.5482 52.2453 16.2183 52.9793 16.0358Z"/>
                  </mask>
                  <path d="M52.9793 16.0358C56.5919 15.1381 60.4451 18.1309 61.586 22.7207C62.7268 27.3107 60.7233 31.76 57.1106 32.6581C56.3765 32.8405 55.6325 32.8604 54.9033 32.7408C54.1024 30.2996 53.3474 27.6792 52.666 24.9377C51.9846 22.196 51.425 19.5274 50.9898 16.9952C51.5781 16.5482 52.2453 16.2183 52.9793 16.0358Z" fill="#FEF5E7"/>
                  <path d="M52.9793 16.0358L52.7984 15.308L52.7984 15.308L52.9793 16.0358ZM61.586 22.7207L62.3139 22.5398L62.3139 22.5398L61.586 22.7207ZM57.1106 32.6581L57.2915 33.3859L57.2915 33.3859L57.1106 32.6581ZM54.9033 32.7408L54.1906 32.9746L54.3326 33.4072L54.7819 33.4809L54.9033 32.7408ZM52.666 24.9377L51.9382 25.1186L51.9382 25.1186L52.666 24.9377ZM50.9898 16.9952L50.5361 16.398L50.1735 16.6735L50.2507 17.1222L50.9898 16.9952ZM52.9793 16.0358L53.1601 16.7637C56.2181 16.0038 59.7744 18.5418 60.8582 22.9016L61.586 22.7207L62.3139 22.5398C61.1158 17.72 56.9658 14.2724 52.7984 15.308L52.9793 16.0358ZM61.586 22.7207L60.8582 22.9016C61.9418 27.2617 59.9876 31.17 56.9297 31.9302L57.1106 32.6581L57.2915 33.3859C61.459 32.3499 63.5118 27.3597 62.3139 22.5398L61.586 22.7207ZM57.1106 32.6581L56.9297 31.9302C56.3001 32.0867 55.6592 32.1047 55.0246 32.0007L54.9033 32.7408L54.7819 33.4809C55.6057 33.616 56.4528 33.5944 57.2915 33.3859L57.1106 32.6581ZM54.9033 32.7408L55.6159 32.507C54.821 30.0839 54.071 27.4813 53.3939 24.7568L52.666 24.9377L51.9382 25.1186C52.6238 27.8772 53.3838 30.5152 54.1906 32.9746L54.9033 32.7408ZM52.666 24.9377L53.3939 24.7568C52.7167 22.0322 52.1609 19.3816 51.729 16.8682L50.9898 16.9952L50.2507 17.1222C50.6891 19.6733 51.2525 22.3598 51.9382 25.1186L52.666 24.9377ZM50.9898 16.9952L51.4435 17.5924C51.955 17.2038 52.5301 16.9203 53.1602 16.7637L52.9793 16.0358L52.7984 15.308C51.9604 15.5163 51.2013 15.8926 50.5361 16.398L50.9898 16.9952Z" fill="#17492D" mask="url(#path-4-inside-1_20_417)"/>
                  <path d="M47.331 2.98397C48.4011 2.2288 49.8875 2.78012 50.2027 4.0483L59.9906 43.4293C60.3136 44.7298 59.176 46.0096 57.8159 45.931L57.6833 45.9197C51.7726 45.1966 41.3938 44.6825 31.7394 45.5181L30.8077 45.6038C28.0769 45.8665 25.3373 46.2497 22.7746 46.5428C20.2 46.8372 17.789 47.0423 15.6614 46.9603C13.5311 46.8782 11.7219 46.509 10.3287 45.6835C8.95096 44.867 7.94887 43.5861 7.45683 41.6064L5.41814 33.4038C4.9297 31.4386 5.28397 29.7256 6.22184 28.1837C7.16749 26.6291 8.71326 25.2392 10.616 23.9601C13.9556 21.715 18.2841 19.8796 22.1687 18.1001L23.8021 17.3399C31.6154 13.6287 39.6826 8.30674 45.1531 4.50939L47.331 2.98397Z" fill="#CDEFDC" stroke="#17492D" strokeWidth="0.75"/>
                  <mask id="path-7-inside-2_20_417" fill="white">
                  <path d="M29.8418 46.0785C24.7551 46.6171 19.7548 47.4807 15.7145 47.3367L9.91262 23.9931C13.5376 21.4324 18.4943 19.3909 22.7216 17.4305L29.8418 46.0785Z"/>
                  </mask>
                  <path d="M29.8418 46.0785C24.7551 46.6171 19.7548 47.4807 15.7145 47.3367L9.91262 23.9931C13.5376 21.4324 18.4943 19.3909 22.7216 17.4305L29.8418 46.0785Z" fill="#FEF5E7"/>
                  <path d="M29.8418 46.0785L29.9208 46.8243L30.7774 46.7336L30.5696 45.8976L29.8418 46.0785ZM15.7145 47.3367L14.9866 47.5176L15.1229 48.066L15.6878 48.0862L15.7145 47.3367ZM9.91262 23.9931L9.47989 23.3806L9.06109 23.6764L9.18477 24.174L9.91262 23.9931ZM22.7216 17.4305L23.4494 17.2496L23.2303 16.3679L22.406 16.7501L22.7216 17.4305ZM29.8418 46.0785L29.7628 45.3326C24.5958 45.8798 19.7111 46.7286 15.7412 46.5871L15.7145 47.3367L15.6878 48.0862C19.7986 48.2327 24.9144 47.3545 29.9208 46.8243L29.8418 46.0785ZM15.7145 47.3367L16.4423 47.1558L10.6405 23.8122L9.91262 23.9931L9.18477 24.174L14.9866 47.5176L15.7145 47.3367ZM9.91262 23.9931L10.3454 24.6057C13.8976 22.0963 18.7566 20.0959 23.0371 18.1109L22.7216 17.4305L22.406 16.7501C18.2319 18.6858 13.1777 20.7684 9.47989 23.3806L9.91262 23.9931ZM22.7216 17.4305L21.9937 17.6114L29.1139 46.2594L29.8418 46.0785L30.5696 45.8976L23.4494 17.2496L22.7216 17.4305Z" fill="#17492D" mask="url(#path-7-inside-2_20_417)"/>
                  <path className="stroke-slate-800 dark:stroke-white" d="M85.9851 17.721L73.6339 21.1922" strokeWidth="2.30588" strokeLinecap="round" strokeLinejoin="round"/>
                  <path className="stroke-slate-800 dark:stroke-white" d="M75.3328 3.01934L67.5093 13.1877" strokeWidth="2.30588" strokeLinecap="round" strokeLinejoin="round"/>
                  <path className="stroke-slate-800 dark:stroke-white" d="M85.7502 33.919L73.3952 30.4612" strokeWidth="2.30588" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-[#243B4C] dark:text-[#D2DFEA] mb-2">
                    Unlock More Potential with Integrations
                  </h3>
                  <p className="text-[#315067] dark:text-[#BDD1E0] mb-4">
                    You're not taking advantage of powerful integrations like Stripe for seamless payments or Prospect2 for advanced donor management. These integrations can
                    significantly boost your fundraising.
                  </p>
                  <div className="flex">
                    <Button variant="link" asChild className="p-0 h-auto text-[#393937] dark:text-[#F7F7F7]">
                      <a href="">View All Integrations &rarr;</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Template Cards Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-6">Popular Form Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templateData.map((template) => (
                <Card key={template.id} className="h-full flex flex-col dark:bg-dark-card-bg dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground dark:text-slate-400 space-y-1">
                        {template.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-custom-button-primary rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                      >
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" className="dark:border-slate-600 dark:text-slate-300">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Latest Updates Carousel Section (Full Width) */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-6">Latest Updates</h2>
            <div className="relative">
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full group"
              >
                <CarouselContent className="-ml-4">
                  {allFeaturesData.map((feature) => (
                    <CarouselItem
                      key={feature.id}
                      className="pl-4 basis-full md:basis-[calc(100%/2.5)] lg:basis-[calc(100%/2.5)]"
                    >
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col dark:bg-dark-card-bg dark:border-slate-700">
                          <CardHeader>
                            <div className="flex items-center mb-2">
                              <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </div>
                            <CardDescription className="text-xs">{feature.date}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground line-clamp-3">{feature.description}</p>
                          </CardContent>
                          <div className="p-6 pt-0">
                            <Button variant="link" asChild className="p-0 h-auto text-custom-button-primary">
                              <a href={feature.learnMoreLink}>Learn More &rarr;</a>
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent dark:from-dark-background pointer-events-none z-10" />

                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card dark:bg-dark-card-bg border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 h-10 w-10">
                  <FontAwesomeIcon icon={faChevronRight} />
                </CarouselNext>
              </Carousel>
            </div>
            {/* Pagination Lines */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={cn(
                    "h-[4px] w-8 rounded-sm transition-colors",
                    currentSlide === index
                      ? "bg-custom-button-primary dark:bg-custom-button-primary"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>

          {/* Common Issues & Solutions Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                  Common Issues & Solutions
                </h2>
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Quick answers to frequently asked questions. Find more help at{" "}
                  <a
                    href="https://help.donate2.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-button-primary hover:underline font-medium"
                  >
                    help.donate2.com
                  </a>
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="dark:border-slate-600 dark:text-slate-300"
                onClick={() => window.open("https://help.donate2.com", "_blank")}
              >
                <FontAwesomeIcon icon={faSearch} className="h-4 w-4 mr-2" />
                Browse All Help
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              {commonIssuesData.map((issue) => (
                <Card key={issue.id} className="dark:bg-dark-card-bg dark:border-slate-700">
                  <Collapsible open={openIssues.includes(issue.id)} onOpenChange={() => toggleIssue(issue.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#FDEAC9] dark:bg-[#674304] rounded-lg flex items-center justify-center mt-0.5">
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className="h-4 w-4 text-[#F59E0B] dark:text-orange-400"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base leading-tight pr-2">{issue.question}</CardTitle>
                            </div>
                          </div>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={cn(
                              "h-4 w-4 text-slate-400 transition-transform flex-shrink-0 mt-1",
                              openIssues.includes(issue.id) && "rotate-180",
                            )}
                          />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4 leading-relaxed">
                          {issue.answer}
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-custom-button-primary hover:text-custom-button-primary-hover"
                          onClick={() => window.open(issue.helpUrl, "_blank")}
                        >
                          Read Full Article
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
