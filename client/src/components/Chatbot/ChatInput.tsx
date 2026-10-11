import { useState } from "react"
import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  onSend: (text: string) => void
  disabled?: boolean
  placeholder?: string
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type your question in English or বাংলা...",
}: Props) {
  const [value, setValue] = useState("")

  const submit = () => {
    if (disabled) return
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue("")
  }

  const canSubmit = !disabled && value.trim().length > 0

  return (
    <div className="border-t border-border/80 bg-card/95 p-3 backdrop-blur-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="relative flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
      >
        <Input
          value={value}
          maxLength={400}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={placeholder}
          aria-label="Type your message"
          className="h-9 flex-1 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground/70"
        />

        <Button
          type="submit"
          size="icon-xs"
          disabled={!canSubmit}
          aria-label="Send message"
          className="size-7 shrink-0 rounded-lg bg-primary text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowUpIcon className="size-4 stroke-[2.5]" />
        </Button>
      </form>

      <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
        <span>Enter ↵ to send • Shift+Enter for new line</span>
        {value.length > 200 && (
          <span className="tabular-nums">
            {value.length}/400
          </span>
        )}
      </div>
    </div>
  )
}
