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

const botAvatarClass = "size-7 rounded-full bg-primary/15 text-primary"
const userAvatarClass = "size-7 rounded-full bg-muted text-muted-foreground"
const enter = "animate-bubble-in motion-reduce:animate-none"

export default function MessageBubble({ message, onFormSuccess }: Props) {
  if ("type" in message && message.type === "form") {
    return (
      <Message align="start" className={enter}>
        <MessageAvatar className={botAvatarClass}>
          <BotIcon className="size-4" />
        </MessageAvatar>
        <MessageContent className="max-w-[480px]">
          <Bubble variant="outline" className="w-full rounded-2xl border-border bg-card shadow-xs">
            <BubbleContent className="w-full bg-transparent p-0">
              <EnquiryForm
                compact
                defaultUserType={message.defaultUserType}
                onSuccess={() => onFormSuccess(message.id)}
              />
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
          className={`max-w-[85%] rounded-2xl ${
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
