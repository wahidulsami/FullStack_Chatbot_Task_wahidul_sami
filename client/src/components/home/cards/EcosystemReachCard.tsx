import { ShieldCheckIcon } from "lucide-react"
import { cn } from "cn"
import BentoCard from "@/components/home/BentoCard"

const reachStats = [
  { value: "50+", label: "Partner Entities", className: "" },
  { value: "2025", label: "Portal Launch", className: "" },
  { value: "Hyderabad", label: "Headquarters", className: "col-span-2" },
]

export default function EcosystemReachCard() {
  return (
    <BentoCard className="lg:col-span-7">
      <div className="space-y-3">
        <div className="flex h-11 items-center">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ShieldCheckIcon className="size-6 stroke-[2]" />
          </span>
        </div>
        <h3 className="break-words font-heading text-lg font-bold text-foreground sm:text-xl">
          Ecosystem Aggregation &amp; Media Reach
        </h3>
        <p className="break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
          Connecting drone innovators, GIS engineers, enterprise clients, and institutional
          authorities across India under a single digital hub.
        </p>
      </div>

      {/* Stats row: always 2-up so long values like "Hyderabad" never clip, last stat spans full width */}
      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border/60 pt-5 text-center sm:gap-4 sm:pt-6">
        {reachStats.map((stat) => (
          <div key={stat.label} className={cn("min-w-0 rounded-xl bg-muted/50 p-3", stat.className)}>
            <div className="break-words font-heading text-2xl font-extrabold leading-none text-foreground lg:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 break-words text-xs font-medium text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
