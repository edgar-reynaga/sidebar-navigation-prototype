"use client"

import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { AppHeader } from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
// Textarea, Checkbox, Label are no longer used on this page directly
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb, faSyncAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons" // faPaperPlane removed
import { cn } from "@/lib/utils"

const allFeaturesData = [
  {
    id: "feat1",
    date: "July 1, 2020",
    type: "new" as const,
    title: "Google Analytics - Enhanced Ecommerce",
    description:
      "To further our Google Analytics Integration, we have added support for Ecommerce and Enhanced Ecommerce. When you view your reporting you will see Ecommerce events throughout. You will see data in Realtime Reports, Behavior Reports, and most importantly Conversions Reports - Ecommerce.",
    learnMoreLink: "#",
  },
  {
    id: "feat2",
    date: "June 24, 2020",
    type: "update" as const,
    title: "Personalized Ask & Personalized Forms",
    description: "Personalize your donors email with a button that loads a Donate2 form with a Personalized Ask amount using our supported URL parameters. Also pre-populate the credit card form with the first name, last name, and email making it even easier for your donor to give. If that’s not enough personalization for you, you can even create your own URL parameters for more customization.",
    learnMoreLink: "#",
  },
  {
    id: "feat3",
    date: "June 24, 2020",
    type: "new" as const,
    title: "Prospect2/ActiveCampaign Marketing Communication",
    description: "You can provide donors the ability to opt-in to your marketing communications with the tap or click of a checkbox while making their donation. They will be subscribed to a List of your choice and tagged so you can send them an email, trigger an Automation, or any of the other really cool things you can do in Pro2/AC.",
    learnMoreLink: "#",
  },
  {
    id: "feat4",
    date: "June 24, 2020",
    type: "update" as const,
    title: "Google Analytics",
    description: "Donate2 supports the ability to set a Property ID for reporting back to your Google Analytics. Enter the Property ID, click save, and look for data in Google Analytics.",
    learnMoreLink: "#",
  },
  {
    id: "feat5",
    date: "June 8, 2020",
    type: "new" as const,
    title: "Prospect2/ActiveCampaign Deep Data",
    description: "Donate2 E-commerce data can be reported back into Prospect2/ActiveCampaign for reporting on the Marketing Revenue Report, attribution to email Campaigns, and attribution to Automations. This data can be used for personalization and segmentation in Campaigns and Automations. This is available on the Gold/Plus plans and higher. Donate2 E-commerce data can be reported back into Prospect2/ActiveCampaign for reporting on the Marketing Revenue Report, attribution to email Campaigns, and attribution to Automations. This data can be used for personalization and segmentation in Campaigns and Automations. This is available on the Gold/Plus plans and higher.",
    learnMoreLink: "#",
  },
]

export default function HomePage() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)

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

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-dark-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 bg-white dark:bg-dark-background overflow-y-auto custom-scrollbar">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-1xl font-normal text-foreground dark:text-slate-100">
              Hello Stephen, Welcome back 👋
            </h1>
            <p className="text-4xl font-bold text-foreground dark:text-white mt-1">Your Dashboard</p>
            <p className="text-muted-foreground dark:text-slate-400 mt-2 max-w-4xl">
              Congratulations! You have at least 1 form that has processed a transaction. This Dashboard will evolve over time with new reporting, tools and information. If you have an idea for a new feature or integration please use the <a href="#" className="underline underline-offset-2 font-semibold">suggestion form</a>.
            </p>
          </div>

          {/* Recent Activity Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-6">Recent activity</h2>
            <div className="space-y-4">
              <div className="bg-card dark:bg-dark-card-bg p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-card-foreground dark:text-slate-100">
                    $68,290.82 USD{" "}
                    <span className="ml-2 px-2 py-1 text-xs bg-custom-status-success-bg text-custom-status-success dark:bg-custom-status-success/20 dark:text-custom-status-success rounded-[4px] font-medium">
                      Active
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Quantity: 126</p>
                </div>
                <div className="text-right min-w-[16rem]">
                  <p className="text-sm text-card-foreground dark:text-slate-200">Group Sales Payment Form</p>
                  <p className="text-xs text-muted-foreground dark:text-slate-500">#FRDAv1</p>
                </div>
                <Button
                  size="sm"
                  className="bg-custom-button-primary hover:bg-custom-button-primary-hover text-slate-900 font-medium"
                >
                  View Report
                </Button>
              </div>
            </div>
          </div>

          {/* Latest Updates Carousel Section (Full Width) */}
          <section className="mb-12">
            {" "}
            {/* Removed lg:col-span-3, parent grid can be simplified if this is the only child */}
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
                              <FontAwesomeIcon
                                icon={feature.type === "new" ? faLightbulb : faSyncAlt}
                                className={cn(
                                  "h-5 w-5 mr-2.5",
                                  feature.type === "new" ? "text-yellow-500" : "text-sky-500",
                                )}
                              />
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
        </main>
      </div>
    </div>
  )
}
