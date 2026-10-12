import { BotIcon, CheckCircle2Icon } from "lucide-react"
import EnquiryForm from "@/components/EnquiryForm"
import type { UserType } from "@/types/enquiry"

export type ChatMessage =
  | { id: string; role: "user" | "bot"; text: string; timestamp?: string }
  | { id: string; role: "bot"; type: "form"; defaultUserType?: UserType; timestamp?: string }
  | { id: string; role: "bot"; type: "confirmation"; text: string; timestamp?: string }

type Props = {
  message: ChatMessage
  onFormSuccess: (id: string) => void
  isExpanded?: boolean
}

export default function MessageBubble({ message, onFormSuccess, isExpanded = false }: Props) {

  if ("type" in message && message.type === "form") {
    return (
      <div className="w-full min-w-0 animate-bubble-in">
        <div className="w-full rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm ring-1 ring-border/20">
          <div className="mb-3.5 flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <BotIcon className="size-4" />
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  Official DroneTV Direct Enquiry
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Direct connection to admissions and enterprise team
                </p>
              </div>
            </div>
            <span className="rounded-xl bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              Lead Form
            </span>
          </div>

          <EnquiryForm
            compact={!isExpanded}
            isExpanded={isExpanded}
            defaultUserType={message.defaultUserType}
            onSuccess={() => onFormSuccess(message.id)}
          />
        </div>
      </div>
    )
  }

  // ─── Bot Enquiry Confirmation Card ───────────────────────────────
  if ("type" in message && message.type === "confirmation") {
    return (
      <div className="flex items-start gap-2.5 animate-bubble-in">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary mt-0.5">
          <BotIcon className="size-4" />
        </span>
        <div className="flex max-w-[85%] flex-col items-start">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 p-4 text-foreground shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm mb-1">
              <CheckCircle2Icon className="size-4" />
              <span>Enquiry Submitted Successfully</span>
            </div>
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-foreground">
              {message.text}
            </p>
          </div>
          {message.timestamp && (
            <span className="mt-1 px-1 text-[12px] text-muted-foreground/70">
              {message.timestamp}
            </span>
          )}
        </div>
      </div>
    )
  }

  const isUser = message.role === "user"

  // ─── User Message (Right-aligned, Orange Bubble) ─────────────────
  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-2.5 animate-bubble-in">
        <div className="group flex max-w-[80%] flex-col items-end">
          <div className="rounded-xl bg-orange-500 text-white px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] leading-[1.6] select-text shadow-xs whitespace-pre-wrap break-words font-normal">
            {"text" in message ? message.text : ""}
          </div>
          {message.timestamp && (
            <span className="mt-1 px-1 text-[12px] text-muted-foreground/70 transition-opacity">
              {message.timestamp}
            </span>
          )}
        </div>
      </div>
    )
  }

  // ─── Bot Message (Left-aligned, Avatar + Neutral Bubble) ──────────
  return (
    <div className="flex items-start gap-2.5 animate-bubble-in">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary mt-0.5">
        <BotIcon className="size-4" />
      </span>
      <div className="group flex max-w-[80%] flex-col items-start">
        <div className="rounded-xl border border-border/60 bg-muted/70 px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] leading-[1.6] text-foreground select-text shadow-2xs whitespace-pre-wrap break-words">
          {"text" in message ? message.text : ""}
        </div>
        {message.timestamp && (
          <span className="mt-1 px-1 text-[12px] text-muted-foreground/70 transition-opacity">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  )
}
