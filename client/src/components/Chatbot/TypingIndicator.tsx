import { BotIcon } from "lucide-react"

export default function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="DroneTV Assistant is typing"
      className="flex items-start gap-2.5 animate-bubble-in"
    >
      {/* Bot small avatar (rounded-xl) */}
      <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary mt-0.5">
        <BotIcon className="size-4 animate-pulse" />
      </span>

      {/* Bot bubble (rounded-xl) */}
      <div className="flex max-w-[80%] items-center gap-1.5 rounded-xl border border-border/60 bg-muted/80 px-4 py-3 text-sm text-foreground shadow-xs">
        <span className="size-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="size-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "160ms" }} />
        <span className="size-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "320ms" }} />
        <span className="sr-only">DroneTV Assistant is typing...</span>
      </div>
    </div>
  )
}
