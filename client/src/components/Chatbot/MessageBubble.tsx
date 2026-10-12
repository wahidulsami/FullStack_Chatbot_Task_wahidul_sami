import { BotIcon, UserIcon } from "lucide-react"
import EnquiryForm from "@/components/EnquiryForm"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message"
import type { UserType } from "@/types/enquiry"

export type ChatMessage =
  | { id: string; role: "user" | "bot"; text: string; timestamp?: string }
  | { id: string; role: "bot"; type: "form"; defaultUserType?: UserType; timestamp?: string }

type Props = {
  message: ChatMessage
  onFormSuccess: (id: string) => void
}

const botAvatarClass = "size-7 rounded-xl bg-primary/15 text-primary"
const userAvatarClass = "size-7 rounded-xl bg-muted text-muted-foreground"
const enter = "animate-bubble-in motion-reduce:animate-none"

export default function MessageBubble({ message, onFormSuccess }: Props) {
  if ("type" in message && message.type === "form") {
    return (
      <div className={`w-full min-w-0 ${enter}`}>
        <div className="w-full rounded-xl border border-border/80 bg-card p-3 sm:p-4 shadow-sm ring-1 ring-border/20">
          <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <BotIcon className="size-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-foreground">Official DroneTV Direct Enquiry</h4>
                <p className="text-[10px] text-muted-foreground">Direct connection to admissions & enterprise team</p>
              </div>
            </div>
            <span className="rounded-xl bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
              Lead Form
            </span>
          </div>
          <EnquiryForm
            compact
            defaultUserType={message.defaultUserType}
            onSuccess={() => onFormSuccess(message.id)}
          />
        </div>
        {message.timestamp && (
          <div className="mt-1 px-1 text-right text-[10px] text-muted-foreground/70">
            {message.timestamp}
          </div>
        )}
      </div>
    )
  }

  const isUser = message.role === "user"

  return (
    <Message align={isUser ? "end" : "start"} className={enter}>
      {!isUser ? (
        <MessageAvatar className={botAvatarClass}>
          <BotIcon className="size-4" />
        </MessageAvatar>
      ) : (
        <MessageAvatar className={userAvatarClass}>
          <UserIcon className="size-4" />
        </MessageAvatar>
      )}
      <MessageContent className={isUser ? "items-end" : "items-start"}>
        <Bubble
          variant={isUser ? "default" : "muted"}
          className={`max-w-[85%] rounded-xl ${
            isUser
              ? "rounded-br-xs bg-primary text-primary-foreground shadow-xs"
              : "rounded-bl-xs border border-border/50 bg-muted/70 text-foreground"
          }`}
        >
          <BubbleContent className="px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-text">
            {"text" in message ? message.text : ""}
          </BubbleContent>
        </Bubble>
        {message.timestamp && (
          <MessageFooter className="text-[10px] text-muted-foreground/70">
            {message.timestamp}
          </MessageFooter>
        )}
      </MessageContent>
    </Message>
  )
}
