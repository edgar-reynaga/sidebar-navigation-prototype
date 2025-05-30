"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ChatPopupProps {
  isOpen: boolean
  onClose: () => void
}

const suggestedQuestions = [
  {
    id: "q1",
    text: "Form URL Parameters: Key-Value Pairs",
    description:
      "We currently support several URL Parameters using Key-Value pairs, as well as other Key-Value pairs you're able to define. Note: Not all URL parameters are available on all form types. See below for...",
  },
  {
    id: "q2",
    text: "Tessitura Integration",
    description:
      "The Tessitura Integrated 2Account allows you to include a Fund ID, Source ID, and Sales Channel to have the contribution logged on a constituent record, and a receipt sent making the process truly...",
  },
  {
    id: "q3",
    text: "What is Stream2?",
    description:
      "Stream2 Forms is a type of form that has specific features that make it perfect for selling access to digital content and comes in several flavors - Flex,...",
  },
  {
    id: "q4",
    text: "Tessitura REST Permissions",
    description:
      "Details about required REST permissions for Tessitura integration, ensuring smooth data flow and security for your operations.",
  },
  {
    id: "q5",
    text: "How to create a new form?",
    description:
      "Step-by-step guide to creating and publishing new forms for various campaigns and events, including customization options.",
  },
]

export function ChatPopup({ isOpen, onClose }: ChatPopupProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue)
      setInputValue("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col dark:bg-dark-card-bg dark:border-dark-border max-h-[90vh] sm:max-h-[600px]">
        <DialogHeader className="p-6 pb-4 border-b dark:border-dark-border/50 flex-shrink-0">
          <DialogTitle className="text-xl text-foreground dark:text-white">Instant Answers</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow p-0">
          <div className="p-6 space-y-3">
            {suggestedQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => setInputValue(q.text)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-colors",
                  "bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/30 dark:hover:bg-slate-700/60 dark:border-slate-600",
                  "focus:outline-none focus:ring-2 focus:ring-custom-button-primary dark:focus:ring-custom-button-primary",
                )}
              >
                <p className="font-medium text-sm text-foreground dark:text-slate-100">{q.text}</p>
                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-1 line-clamp-2">{q.description}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="p-4 border-t dark:border-dark-border/50 flex-shrink-0">
          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-grow">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="What can we help you with?"
                className="pl-10 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
            </div>
            <Button
              type="button"
              size="icon"
              onClick={handleSend}
              className="bg-custom-button-primary hover:bg-custom-button-primary-hover"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 text-slate-900 dark:text-slate-900" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
