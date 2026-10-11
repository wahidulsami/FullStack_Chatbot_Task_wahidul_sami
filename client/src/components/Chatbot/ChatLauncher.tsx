import { useEffect, useRef, useState } from "react"
import { BotIcon, MessageCircleIcon, SparklesIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatWindow from "./ChatWindow"
import { playChatChime, resumeAudioContext } from "./chatSound"

export default function ChatLauncher() {
  const [open, setOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showGreetingBubble, setShowGreetingBubble] = useState(false)
  const hasPlayedSoundRef = useRef(false)

  // Landing page behavior: on page load/mount, the chat window stays CLOSED,
  // but after a short delay (1.2s), a welcoming speech bubble appears and a gentle chime sound plays.
  useEffect(() => {
    // Resume audio context on first user interaction if browser blocked auto-playback
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
  }, [])

  const handleOpenChat = () => {
    setShowGreetingBubble(false)
    setOpen(true)
  }

  const handleCloseChat = () => {
    setOpen(false)
    setIsExpanded(false)
  }

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <>
      {/* ─── Expand Backdrop Overlay (active when expanded) ───────── */}
      {open && isExpanded && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* ─── Chat Window (Floating or Expanded with Double-Bezel) ──── */}
      {open && (
        <div
          className={`fixed z-50 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isExpanded
              ? "inset-2 sm:inset-4 md:inset-6 lg:inset-8 rounded-[2rem] p-1.5 sm:p-2 bg-muted/40 border border-border shadow-2xl backdrop-blur-md"
              : "inset-x-3 bottom-20 top-16 sm:top-auto sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[630px] sm:w-[420px] rounded-[2rem] p-1.5 bg-muted/40 border border-border shadow-2xl backdrop-blur-md"
          }`}
        >
          <div className="size-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-card border border-border/40 shadow-xs flex flex-col">
            <ChatWindow
              onClose={handleCloseChat}
              isExpanded={isExpanded}
              onToggleExpand={handleToggleExpand}
            />
          </div>
        </div>
      )}

      {/* ─── Landing Welcome Speech Bubble (When Chat is Closed) ──── */}
      {showGreetingBubble && !open && (
        <div
          role="dialog"
          aria-label="Welcome message"
          className="fixed right-3 bottom-20 sm:right-6 sm:bottom-24 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-[320px] rounded-[1.8rem] p-1.5 bg-muted/40 border border-border shadow-2xl backdrop-blur-md animate-bubble-in motion-reduce:animate-none select-none"
        >
          <div className="rounded-[calc(1.8rem-0.375rem)] bg-card p-3.5 border border-border/40 shadow-xs flex items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
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
                  className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs px-3 shadow-xs"
                >
                  <SparklesIcon className="size-3 mr-1" />
                  Chat with us
                </Button>
                <button
                  type="button"
                  onClick={() => setShowGreetingBubble(false)}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors px-1 py-0.5"
                >
                  Later
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label="Dismiss greeting"
              onClick={() => setShowGreetingBubble(false)}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/60 transition-colors"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Floating Chat Launcher Button (Vibrant Yellow Brand) ─── */}
      <Button
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
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 size-14 rounded-full shadow-2xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {open ? (
          <XIcon className="size-6 transition-transform rotate-0 hover:rotate-90" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircleIcon className="size-6" />
            {!showGreetingBubble && (
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-500 border-2 border-background" />
              </span>
            )}
          </div>
        )}
      </Button>
    </>
  )
}
