import { useEffect, useRef, useState } from "react"
import {
  BotIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  HelpCircleIcon,
  Maximize2Icon,
  Minimize2Icon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react"
import ChatInput from "./ChatInput"
import MessageBubble, { type ChatMessage } from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"
import { playChatChime, playMessageSentSound } from "./chatSound"
import { QUICK_QUESTIONS, WELCOME_TEXT, getBotReply } from "@/data/chatbotData"

const STORAGE_KEY = "dronetv-chat-history"
const FORM_SUBMITTED_KEY = "dronetv-form-submitted"

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

function loadFormSubmitted(): boolean {
  try {
    return sessionStorage.getItem(FORM_SUBMITTED_KEY) === "true"
  } catch {
    return false
  }
}

type Props = {
  onClose?: () => void
  isExpanded?: boolean
  isMobile?: boolean
  isCompact?: boolean
  onToggleExpand?: () => void
}

function QuickRow({
  index,
  label,
  disabled,
  hidden,
  onClick,
}: {
  index: number
  label: string
  disabled?: boolean
  hidden?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      tabIndex={hidden ? -1 : undefined}
      onClick={onClick}
      className="group flex min-h-[44px] w-full items-center gap-3 rounded-xl border border-gray-200/80 bg-white px-3 py-2.5 text-left text-sm text-gray-800 shadow-xs transition-all hover:bg-gray-100 hover:border-orange-500/60 hover:text-orange-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800/80 dark:hover:border-orange-500/60 dark:hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-[12px] font-bold text-gray-700 transition-colors group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:border-orange-500 dark:group-hover:bg-orange-500 dark:group-hover:text-white">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1 break-words leading-snug whitespace-normal">
        {label}
      </span>
      <ChevronRightIcon className="size-4 shrink-0 text-gray-400 dark:text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-500 dark:group-hover:text-orange-400" />
    </button>
  )
}

export default function ChatWindow({
  onClose,
  isExpanded = false,
  isMobile = false,
  isCompact = false,
  onToggleExpand,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory)
  const [isTyping, setIsTyping] = useState(false)
  const [hasSubmittedForm, setHasSubmittedForm] = useState(loadFormSubmitted)
  const [showAllQuestions, setShowAllQuestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [confirmReset, setConfirmReset] = useState(false)
  const [draftText, setDraftText] = useState("")
  const [focusTrigger, setFocusTrigger] = useState(0)
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false)

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const isNearBottomRef = useRef(true)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Full list shows once in welcome state, and afterwards ONLY under the latest bot reply
  const lastMessage = messages[messages.length - 1]
  const isLatestMessageBot = lastMessage && lastMessage.role === "bot"
  const showQuickList = showSuggestions && !isTyping && isLatestMessageBot
  const isListExpanded = isExpanded || showAllQuestions

  // Scroll viewport smoothly to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
  }

  // Handle scroll events to detect when user scrolls up away from the bottom
  const handleScroll = () => {
    const el = messagesContainerRef.current
    if (!el) return
    const threshold = 80
    const isNear = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
    isNearBottomRef.current = isNear
    if (isNear) {
      setShowScrollDownBtn(false)
    } else {
      setShowScrollDownBtn(true)
    }
  }

  // Persist history and scroll down when new messages or typing state change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // Storage quota or private mode
    }

    if (isNearBottomRef.current) {
      requestAnimationFrame(() => scrollToBottom("smooth"))
      setShowScrollDownBtn(false)
    } else {
      setShowScrollDownBtn(true)
    }
  }, [messages, isTyping])

  // Initial scroll on mount
  useEffect(() => {
    scrollToBottom("auto")
  }, [])

  // Cleanup pending timer on unmount
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

    // 500ms typing indicator before bot replies
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

      // Only show enquiry form if not already submitted in this conversation
      if (reply.showForm && !hasSubmittedForm) {
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
      // Autofocus back on composer input after bot reply
      setFocusTrigger((prev) => prev + 1)
    }, 500)
  }

  const handleFormSuccess = (formId: string) => {
    setHasSubmittedForm(true)
    try {
      sessionStorage.setItem(FORM_SUBMITTED_KEY, "true")
    } catch {
      // Ignore
    }

    setMessages((prev) => [
      ...prev.filter((m) => m.id !== formId),
      {
        id: uid(),
        role: "bot",
        type: "confirmation",
        text: "Thank you! Your enquiry has been successfully submitted. Our team will get back to you within 24 hours.",
        timestamp: formatTime(),
      },
    ])
    playChatChime()
    setFocusTrigger((prev) => prev + 1)
  }

  const reset = () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    setIsTyping(false)
    setHasSubmittedForm(false)
    setConfirmReset(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(FORM_SUBMITTED_KEY)
    } catch {
      // Ignore
    }
    setMessages(welcome())
    setDraftText("")
    setShowAllQuestions(false)
    setShowSuggestions(true)
    setFocusTrigger((prev) => prev + 1)
  }

  return (
    <div className="flex h-full w-full flex-col bg-card text-foreground select-none overflow-hidden">
      {/* ─── Header (64px Height) ─────────────────────────────────── */}
      <header className="h-16 shrink-0 border-b border-border/80 bg-card/95 backdrop-blur-xs flex items-center w-full z-10">
        <div className="mx-auto w-full max-w-[720px] px-4 flex items-center justify-between">
          {confirmReset ? (
            /* Inline Reset Confirmation Bar */
            <div className="flex w-full items-center justify-between text-xs sm:text-sm animate-bubble-in">
              <span className="font-semibold text-foreground">Clear this conversation?</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-2xs cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Left: Avatar + Title + Online Status */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-2xs">
                  <BotIcon className="size-5" />
                  <span className="absolute -top-0.5 -right-0.5 flex size-2.5">

                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm sm:text-base font-semibold tracking-tight text-foreground">
                      DroneTV Assistant
                    </h2>
                  </div>
                  <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>Online • Instant answers</span>
                  </p>
                </div>
              </div>

              {/* Right: Actions (36px Icon Buttons: rounded-lg) */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Persistent Talk to a Human (WhatsApp / Phone) Action */}
              
                <button
                  type="button"
                  onClick={() => setShowSuggestions((prev) => !prev)}
                  aria-label="Toggle quick questions suggestions"
                  title="Toggle suggested questions"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <HelpCircleIcon className="size-4" />
                </button>

                {/* New Chat (with confirmation) Action */}
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  aria-label="New chat conversation"
                  title="New chat"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <RotateCcwIcon className="size-4" />
                </button>

                {/* Expand / Minimize Window Action (Desktop Only) */}
                {onToggleExpand && !isMobile && (
                  <button
                    type="button"
                    onClick={onToggleExpand}
                    aria-label={isExpanded ? "Collapse dialog" : "Expand dialog"}
                    title={isExpanded ? "Collapse dialog" : "Expand dialog"}
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    {isExpanded ? (
                      <Minimize2Icon className="size-4" />
                    ) : (
                      <Maximize2Icon className="size-4" />
                    )}
                  </button>
                )}

                {/* Close Action: Hidden in compact mode (launcher is the single close control) */}
                {onClose && !isCompact && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close chat"
                    title="Close chat"
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <XIcon className="size-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* ─── Messages Area (Single Scrollable Container) ───────────── */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          role="log"
          aria-live="polite"
          className="h-full w-full overflow-y-auto overscroll-contain px-4 pt-4 pb-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        >
          <div className="mx-auto w-full max-w-[720px] space-y-4">
            {/* Message Bubbles */}
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onFormSuccess={handleFormSuccess}
                isExpanded={isExpanded}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* ─── Vertical Quick Questions: only under the latest bot reply ─── */}
            {showQuickList && (
              <div className="rounded-xl bg-gray-50 border border-gray-200 dark:bg-zinc-800/80 dark:border-zinc-700 p-3 animate-bubble-in">
                <div className="mb-2 flex items-center justify-between gap-2 text-[12px] text-gray-500 dark:text-zinc-400">
                  <span className="font-semibold text-gray-800 dark:text-zinc-200">
                    Quick Questions ({QUICK_QUESTIONS.length})
                  </span>
                  <span>Click to send instantly</span>
                </div>

                <div className="space-y-2">
                  {QUICK_QUESTIONS.slice(0, 4).map((question, index) => (
                    <QuickRow
                      key={question}
                      index={index}
                      label={question}
                      disabled={isTyping}
                      onClick={() => send(question)}
                    />
                  ))}

                  {/* Remaining rows expand inline with smooth height transition */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      isListExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    aria-hidden={!isListExpanded}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-2 pt-2">
                        {QUICK_QUESTIONS.slice(4).map((question, i) => (
                          <QuickRow
                            key={question}
                            index={i + 4}
                            label={question}
                            disabled={isTyping}
                            hidden={!isListExpanded}
                            onClick={() => send(question)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {!isExpanded && !showAllQuestions && QUICK_QUESTIONS.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowAllQuestions(true)}
                      className="group flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border border-gray-200/80 bg-white px-3.5 py-2.5 text-left text-sm text-gray-800 shadow-xs transition-all hover:bg-gray-100 hover:border-orange-500/60 hover:text-orange-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800/80 dark:hover:border-orange-500/60 dark:hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
                    >
                      <span className="font-medium text-gray-700 dark:text-zinc-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        Show {QUICK_QUESTIONS.length - 4} more questions
                      </span>
                      <ChevronDownIcon className="size-4 text-gray-400 dark:text-zinc-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-transform group-hover:translate-y-0.5" />
                    </button>
                  )}

                  {!isExpanded && showAllQuestions && QUICK_QUESTIONS.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowAllQuestions(false)}
                      className="group flex min-h-[36px] w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200/80 bg-gray-100/80 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      <span>Show fewer questions</span>
                      <ChevronUpIcon className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating circular scroll-to-bottom button */}
        {showScrollDownBtn && (
          <button
            type="button"
            onClick={() => {
              scrollToBottom("smooth")
              setShowScrollDownBtn(false)
            }}
            className="absolute right-6 bottom-4 z-20 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground dark:text-zinc-950 shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-border/20 animate-bubble-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label="Scroll to bottom"
            title="Scroll to bottom"
          >
            <ChevronDownIcon className="size-5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* ─── Fixed Composer (Input) ─────────────────────────────────── */}
      <ChatInput
        onSend={send}
        disabled={isTyping}
        value={draftText}
        onChange={setDraftText}
        focusTrigger={focusTrigger}
      />
    </div>
  )
}
