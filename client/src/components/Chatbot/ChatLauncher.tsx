import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { BotIcon, MessageCircleIcon, SparklesIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatWindow from "./ChatWindow"
import { playChatChime, resumeAudioContext } from "./chatSound"

export default function ChatLauncher() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin")

  const [open, setOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showGreetingBubble, setShowGreetingBubble] = useState(false)
  const hasPlayedSoundRef = useRef(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  // Track viewport size for mobile full-screen sheet vs desktop modes
  useEffect(() => {
    if (isAdminPage) return
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isAdminPage])

  // Landing page behavior: on mount, chat stays closed; after 1.2s greeting bubble appears and chime plays
  useEffect(() => {
    if (isAdminPage) return
    const unlockAudio = () => {
      resumeAudioContext()
      if (!hasPlayedSoundRef.current) {
        playChatChime()
        hasPlayedSoundRef.current = true
      }
      window.removeEventListener("pointerdown", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
    }

    window.addEventListener("pointerdown", unlockAudio, { once: true })
    window.addEventListener("keydown", unlockAudio, { once: true })

    const timer = setTimeout(() => {
      setShowGreetingBubble(true)
      const played = playChatChime()
      if (played) {
        hasPlayedSoundRef.current = true
      }
    }, 1200)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("pointerdown", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
    }
  }, [isAdminPage])

  // Lock body scroll when in expanded dialog or mobile full-screen mode
  useEffect(() => {
    if (open && (isExpanded || isMobile)) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [open, isExpanded, isMobile])

  const handleOpenChat = () => {
    setShowGreetingBubble(false)
    setOpen(true)
  }

  const handleCloseChat = () => {
    setOpen(false)
    setIsExpanded(false)
    // Accessibility: Return focus to launcher button upon closing
    setTimeout(() => {
      launcherRef.current?.focus()
    }, 50)
  }

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  // Close on Escape key press
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return
      if (e.key === "Escape") {
        handleCloseChat()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  if (isAdminPage) {
    return null
  }

  // Hide launcher while chat is open in expanded or mobile mode.
  // In compact mode on desktop, launcher is visible and turns into X (the single close control).
  const hideLauncher = open && (isExpanded || isMobile)

  return (
    <>
      {/* ─── Expanded Mode Backdrop (Desktop) ─────────────────────────── */}
      {open && isExpanded && !isMobile && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={handleCloseChat}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* ─── Chat Window Container ───────────────────────────────────── */}
      {open && (
        <>
          {isMobile ? (
            /* Mobile Full-Screen Sheet (<640px) */
            <div
              role="dialog"
              aria-modal="true"
              aria-label="DroneTV Chat Assistant"
              className="fixed inset-0 z-[100] h-[100dvh] w-full bg-card flex flex-col overflow-hidden"
            >
              <ChatWindow
                onClose={handleCloseChat}
                isExpanded={false}
                isMobile={true}
                isCompact={false}
              />
            </div>
          ) : isExpanded ? (
            /* Desktop Expanded Centered Dialog (min(920px, 100vw-4rem)) */
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none"
              role="presentation"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label="DroneTV Chat Assistant"
                className="pointer-events-auto relative flex flex-col overflow-hidden w-[min(920px,calc(100vw-4rem))] h-[min(90dvh,900px)] rounded-xl border border-border/80 bg-card shadow-2xl animate-bubble-in"
              >
                <ChatWindow
                  onClose={handleCloseChat}
                  isExpanded={true}
                  isMobile={false}
                  isCompact={false}
                  onToggleExpand={handleToggleExpand}
                />
              </div>
            </div>
          ) : (
            /* Desktop Compact Mode (min(420px, 100vw-2rem)) */
            <div
              role="region"
              aria-label="DroneTV Chat Assistant"
              className="fixed bottom-24 right-6 z-50 w-[min(420px,calc(100vw-2rem))] h-[min(680px,calc(100dvh-8rem))] rounded-xl border border-border/80 bg-card shadow-2xl flex flex-col overflow-hidden animate-bubble-in"
            >
              <ChatWindow
                onClose={handleCloseChat}
                isExpanded={false}
                isMobile={false}
                isCompact={true}
                onToggleExpand={handleToggleExpand}
              />
            </div>
          )}
        </>
      )}

      {/* ─── Landing Welcome Speech Bubble (When Chat is Closed) ──── */}
      {showGreetingBubble && !open && (
        <div
          role="dialog"
          aria-label="Welcome message"
          className="fixed right-3 bottom-20 sm:right-6 sm:bottom-24 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-[320px] rounded-xl p-1.5 bg-muted/40 border border-border shadow-2xl backdrop-blur-md animate-bubble-in select-none"
        >
          <div className="rounded-xl bg-card p-3.5 border border-border/40 shadow-xs flex items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BotIcon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">DroneTV Assistant</span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Hi! Have questions about our courses, fees, or services? 👋
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <Button
                  size="xs"
                  onClick={handleOpenChat}
                  className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs px-3 shadow-xs"
                >
                  <SparklesIcon className="size-3 mr-1" />
                  Chat with us
                </Button>
                <button
                  type="button"
                  onClick={() => setShowGreetingBubble(false)}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded-lg hover:bg-muted/60"
                >
                  Later
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label="Dismiss greeting"
              onClick={() => setShowGreetingBubble(false)}
              className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted/60 transition-colors"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Floating Chat Launcher Button ────────────────────────────── */}
      {!hideLauncher && (
        <Button
          ref={launcherRef}
          type="button"
          aria-label={open ? "Close chat window" : "Open chat with DroneTV Assistant"}
          onClick={() => {
            if (open) {
              handleCloseChat()
            } else {
              handleOpenChat()
            }
          }}
          size="icon-lg"
          className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 size-14 rounded-xl shadow-2xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {open ? (
            <XIcon className="size-6 transition-transform rotate-0 hover:rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageCircleIcon className="size-6" />
              {!showGreetingBubble && (
                <span className="absolute -top-1 -right-1 flex size-3">
           
                </span>
              )}
            </div>
          )}
        </Button>
      )}
    </>
  )
}
