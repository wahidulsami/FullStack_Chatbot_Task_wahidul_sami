import { CompassIcon } from "lucide-react"
import BentoCard from "@/components/home/BentoCard"

const expoStats = [
  { value: "Drone Expo", label: "Media Partner" },
  { value: "Mumbai & HYD", label: "Expo Editions" },
  { value: "@indiadronetv", label: "YouTube Channel" },
]

export default function ExpoSpotlightCard() {
  return (
    <BentoCard className="lg:col-span-7">
      <div className="space-y-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <CompassIcon className="size-6 stroke-[2]" />
        </span>
        <h3 className="break-words font-heading text-lg font-bold text-foreground sm:text-xl">
          Drone Expo &amp; Industry Video Spotlight
        </h3>
        <p className="mb-6 max-w-prose break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
          Exclusive stall coverage, product showcases, and executive interviews from Drone Expo
          Hyderabad and Mumbai. Highlighting innovators including CropWings, Corteva, Carbon Light,
          XBOOM underwater drones, and RPTO leaders.
        </p>
      </div>

      <div className="mt-auto grid grid-cols-1 gap-2.5 border-t border-border/60 pt-5 text-center sm:grid-cols-3 sm:gap-3 sm:pt-6">
        {expoStats.map((stat) => (
          <div key={stat.label} className="min-w-0 rounded-xl bg-muted/50 p-2.5">
            <div className="break-words font-mono text-xs font-bold text-foreground sm:text-sm">
              {stat.value}
            </div>
            <div className="break-words text-xs font-medium uppercase text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
