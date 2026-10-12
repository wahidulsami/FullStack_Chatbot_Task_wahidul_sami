import { ArrowRightIcon, BotIcon } from "lucide-react"
import BentoCard from "@/components/home/BentoCard"
import { Button } from "@/components/ui/button"
import { triggerChat } from "@/lib/triggerChat"

const sampleQueries = [
  "What is DroneTV and what is its mission?",
  "What services and media coverage does DroneTV provide?",
  "What is Drone Doctor Help Line and technical support?",
]

export default function AssistantCoreCard() {
  return (
    <BentoCard className="lg:col-span-5">
      <div className="space-y-3">
        <div className="flex h-11 items-center justify-between gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <BotIcon className="size-6 stroke-[2]" />
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            24/7 Rule Engine
          </span>
        </div>
        <h3 className="break-words font-heading text-lg font-bold text-foreground sm:text-xl">
          Interactive Assistant Core
        </h3>
        <p className="break-words text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Instant answers on DroneTV media coverage, Drone Doctor assistance, directory listings, and
          partner training.
        </p>
      </div>

      {/* Suggested question buttons: wrap without ellipsis */}
      <div className="my-4 space-y-2">
        {sampleQueries.map((query) => (
          <button
            key={query}
            type="button"
            onClick={triggerChat}
            className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/40 p-3 text-left text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.99]"
          >
            <span className="min-w-0 break-words leading-snug whitespace-normal">{query}</span>
            <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="mt-auto pt-2">
        <Button
          onClick={triggerChat}
          className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 sm:text-sm"
        >
          Open Full Assistant
        </Button>
      </div>
    </BentoCard>
  )
}
