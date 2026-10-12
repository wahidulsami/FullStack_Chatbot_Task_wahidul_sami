import { BotIcon, SparklesIcon } from "lucide-react"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"

const DOT_DELAYS = [0, 160, 320]

export default function TypingIndicator() {
  return (
    <Message
      align="start"
      aria-label="DroneTV Assistant is typing"
      className="animate-bubble-in motion-reduce:animate-none"
    >
      <MessageAvatar className="size-7 rounded-xl bg-primary/15 text-primary">
        <BotIcon className="size-4 animate-pulse" />
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted" className="rounded-xl border border-border/50 bg-muted/60">
          <BubbleContent className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-semibold tracking-tight text-foreground flex items-center gap-1">
              <SparklesIcon className="size-3 text-primary animate-spin" style={{ animationDuration: "3s" }} />
              DroneTV Assistant
            </span>
            <div className="flex items-center gap-1">
              {DOT_DELAYS.map((delay) => (
                <span
                  key={delay}
                  style={{ animationDelay: `${delay}ms` }}
                  className="size-1.5 rounded-full bg-primary animate-typing-dot motion-reduce:animate-none"
                />
              ))}
            </div>
            <span className="sr-only">DroneTV Assistant is typing...</span>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
