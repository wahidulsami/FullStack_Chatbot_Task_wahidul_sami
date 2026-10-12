import { useEffect, useRef, useState } from "react"
import { ArrowUpIcon, PhoneIcon } from "lucide-react"

type Props = {
  onSend: (text: string) => void
  disabled?: boolean
  placeholder?: string
  value?: string
  onChange?: (val: string) => void
  focusTrigger?: number
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask about courses, services, Drone Doctor...",
  value: externalValue,
  onChange: externalOnChange,
  focusTrigger,
}: Props) {
  const [internalValue, setInternalValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const value = externalValue !== undefined ? externalValue : internalValue
  const setValue = (val: string) => {
    if (externalOnChange) {
      externalOnChange(val)
    } else {
      setInternalValue(val)
    }
  }

  // Auto-grow textarea between 1 and 5 rows (min 44px, max ~130px)
  const autoGrow = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    const nextHeight = Math.max(44, Math.min(el.scrollHeight, 130))
    el.style.height = `${nextHeight}px`
  }

  useEffect(() => {
    autoGrow()
  }, [value])

  // Autofocus when requested (on mount and after bot reply)
  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus()
    }, 80)
    return () => clearTimeout(timer)
  }, [focusTrigger])

  const submit = () => {
    if (disabled) return
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px"
    }
  }

  const canSubmit = !disabled && value.trim().length > 0

  return (
    <div className="w-full shrink-0 border-t border-border/80 bg-card/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xs">
      <div className="mx-auto w-full max-w-[720px] px-4">
        {/* Single container for the composer (theme-adaptive) */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="relative flex items-center gap-2 rounded-xl border-2 border-orange-500 bg-white dark:bg-zinc-900 px-3.5 py-1.5 transition-all shadow-sm focus-within:ring-2 focus-within:ring-orange-500/25"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            maxLength={600}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.target.value)
              autoGrow()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault()
                submit()
              }
            }}
            placeholder={placeholder}
            aria-label="Type your message"
            className="min-h-[44px] flex-1 resize-none border-0 bg-transparent py-2.5 text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 dark:text-white dark:placeholder:text-zinc-400 focus:outline-none focus:ring-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          />

          {/* 36px square Send Button (rounded-lg) */}
          <button
            type="submit"
            disabled={!canSubmit}
            aria-label="Send message"
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              canSubmit
                ? "cursor-pointer bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-sm"
                : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-zinc-500 opacity-80"
            }`}
          >
            <ArrowUpIcon className="size-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Footer info: Keyboard hint on md+ and persistent Human Support link */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-1 px-1 text-[12px] text-muted-foreground">
          <span className="hidden md:inline">Enter to send - Shift+Enter for new line</span>
          <span className="ml-auto inline-flex items-center gap-1.5">
            <span>Need human support?</span>
            <a
              href="https://wa.me/918882210038"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded font-medium text-orange-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <PhoneIcon className="size-3" />
              <span>WhatsApp / +91 8882210038</span>
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
