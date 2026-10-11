import { BotIcon } from "lucide-react"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"

const DOT_DELAYS = [0, 140, 280]

export default function TypingIndicator() {
  return (
    <Message
      align="start"
      aria-label="Assistant is typing"
      className="animate-bubble-in motion-reduce:animate-none"
    >
      <MessageAvatar className="size-7 rounded-full bg-primary/15 text-primary">
        <BotIcon className="size-4" />
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted" className="rounded-2xl border border-border/40">
          <BubbleContent className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-medium tracking-tight">Thinking</span>
            <div className="flex items-center gap-1">
              {DOT_DELAYS.map((delay) => (
                <span
                  key={delay}
                  style={{ animationDelay: `${delay}ms` }}
                  className="size-1.5 rounded-full bg-primary animate-typing-dot motion-reduce:animate-none"
                />
              ))}
            </div>
            <span className="sr-only">Assistant is typing…</span>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
