import { useEffect, useRef, useState } from "react"
import {
  BotIcon,
  ChevronRightIcon,
  HelpCircleIcon,
  Maximize2Icon,
  Minimize2Icon,
  RotateCcwIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import ChatInput from "./ChatInput"
import MessageBubble, { type ChatMessage } from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"
import { playChatChime, playMessageSentSound } from "./chatSound"
import { QUICK_QUESTIONS, WELCOME_TEXT, getBotReply } from "@/data/chatbotData"

const STORAGE_KEY = "dronetv-chat-history"

const uid = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

const formatTime = () =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date())

const welcome = (): ChatMessage[] => [
  {
    id: uid(),
    role: "bot",
    text: WELCOME_TEXT,
    timestamp: formatTime(),
  },
]

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as ChatMessage[]
    }
  } catch {
    // SessionStorage unavailable or corrupt
  }
  return welcome()
}

type Props = {
  onClose?: () => void
  isExpanded?: boolean
  onToggleExpand?: () => void
}

export default function ChatWindow({ onClose, isExpanded = false, onToggleExpand }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const viewportRef = useRef<HTMLDivElement>(null)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Persist history and scroll down smoothly on message change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // Storage quota or private browsing
    }
    const vp = viewportRef.current
    if (vp) {
      requestAnimationFrame(() => {
        vp.scrollTo({ top: vp.scrollHeight, behavior: "smooth" })
      })
    }
  }, [messages, isTyping])

  // Cleanup pending typing timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    }
  }, [])

  const send = (text: string) => {
    if (isTyping) return
    const trimmed = text.trim()
    if (!trimmed) return

    playMessageSentSound()

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      text: trimmed,
      timestamp: formatTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // 500ms typing indicator with bouncing dots before bot replies
    typingTimerRef.current = setTimeout(() => {
      const reply = getBotReply(trimmed)
      const botMessages: ChatMessage[] = [
        {
          id: uid(),
          role: "bot",
          text: reply.text,
          timestamp: formatTime(),
        },
      ]

      if (reply.showForm) {
        botMessages.push({
          id: uid(),
          role: "bot",
          type: "form",
          defaultUserType: reply.defaultUserType,
          timestamp: formatTime(),
        })
      }

      setMessages((prev) => [...prev, ...botMessages])
      setIsTyping(false)
      playChatChime()
    }, 500)
  }

  const handleFormSuccess = (formId: string) => {
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== formId),
      {
        id: uid(),
        role: "bot",
        text: "🎉 Thank you! Your enquiry has been successfully submitted. Our team will get back to you within 24 hours.",
        timestamp: formatTime(),
      },
    ])
    playChatChime()
  }

  const reset = () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    setIsTyping(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
    setMessages(welcome())
    setShowSuggestions(true)
  }

  return (
    <div className="flex h-full w-full flex-col bg-card text-foreground select-none">
      {/* ─── Header / Navigation Bar ───────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/80 bg-card/95 px-3.5 backdrop-blur-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-2xs">
            <BotIcon className="size-4.5" />
            <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-xl bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-xl bg-emerald-500" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-sm font-semibold tracking-tight text-foreground">
                DroneTV Assistant
              </h2>
              <span className="hidden sm:inline-flex rounded-xl bg-primary/15 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                AI Assistant
              </span>
            </div>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-xl bg-emerald-500" />
              Online • Instant answers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Toggle Suggestions Button */}
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setShowSuggestions((prev) => !prev)}
            title={showSuggestions ? "Hide suggested questions" : "Show suggested questions"}
            aria-label="Toggle suggestions"
            className="text-muted-foreground hover:text-foreground"
          >
            <HelpCircleIcon className="size-4" />
          </Button>

          {/* Reset History Button */}
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={reset}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcwIcon className="size-4" />
          </Button>

          {/* Expand / Minimize Window Button */}
          {onToggleExpand && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onToggleExpand}
              title={isExpanded ? "Restore compact window" : "Expand all over website"}
              aria-label={isExpanded ? "Restore window" : "Expand window"}
              className="text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? (
                <Minimize2Icon className="size-4" />
              ) : (
                <Maximize2Icon className="size-4" />
              )}
            </Button>
          )}

          {/* Close Window Button */}
          {onClose && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClose}
              title="Close chat"
              aria-label="Close chat"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
      </header>

      {/* ─── Body / Message Scroller ───────────────────────────────── */}
      <MessageScrollerProvider autoScroll>
        <MessageScroller className="flex-1 min-h-0 bg-background/50">
          <MessageScrollerViewport
            ref={viewportRef}
            className="p-3.5 sm:p-4 space-y-4"
            role="log"
            aria-live="polite"
          >
            <MessageScrollerContent className="flex flex-col gap-3.5 max-w-3xl mx-auto w-full">
              {/* Message Rows */}
              {messages.map((message) => (
                <MessageScrollerItem key={message.id}>
                  <MessageBubble message={message} onFormSuccess={handleFormSuccess} />
                </MessageScrollerItem>
              ))}

              {/* Typing indicator (0.5s duration) */}
              {isTyping && (
                <MessageScrollerItem>
                  <TypingIndicator />
                </MessageScrollerItem>
              )}

              {/* ─── Vertical Suggestions (7 Quick Questions) ────────── */}
              {showSuggestions && (
                <MessageScrollerItem>
                  <div className="mt-2 rounded-xl border border-border/80 bg-card p-3 shadow-xs animate-bubble-in">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <SparklesIcon className="size-3.5 text-primary" />
                        <span>Quick Questions ({QUICK_QUESTIONS.length})</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        Click to send instantly
                      </span>
                    </div>

                    {/* Vertically stacked question buttons with clean design */}
                    <div className="flex flex-col gap-1.5">
                      {QUICK_QUESTIONS.map((question, index) => (
                        <button
                          key={question}
                          type="button"
                          disabled={isTyping}
                          onClick={() => send(question)}
                          className="group flex w-full items-center justify-between gap-2.5 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-left text-xs font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/5 hover:text-primary active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-xl bg-background text-[11px] font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground border border-border transition-colors">
                              {index + 1}
                            </span>
                            <span className="truncate">{question}</span>
                          </div>
                          <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </button>
                      ))}
                    </div>
                  </div>
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton
            direction="end"
            className="left-auto right-4 inset-s-auto translate-x-0 bottom-2.5 shadow-md z-20"
          />
        </MessageScroller>
      </MessageScrollerProvider>

      {/* ─── Footer / Chat Input ───────────────────────────────────── */}
      <ChatInput onSend={send} disabled={isTyping} />
    </div>
  )
}
