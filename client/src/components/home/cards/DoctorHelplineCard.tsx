import { CheckCircle2Icon, WrenchIcon } from "lucide-react"
import BentoCard from "@/components/home/BentoCard"

const supportPoints = [
  "Firmware diagnostics & sensor calibration",
  "Hardware maintenance & repair advisories",
  "DGCA regulatory compliance assistance",
]

export default function DoctorHelplineCard() {
  return (
    <BentoCard className="lg:col-span-5">
      <div className="space-y-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <WrenchIcon className="size-6 stroke-[2]" />
        </span>
        <h3 className="break-words font-heading text-lg font-bold text-foreground sm:text-xl">
          Drone Doctor Help Line
        </h3>
        <p className="break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
          Specialized technical helpline for commercial drone pilots, operators, and engineering
          teams.
        </p>
      </div>

      <ul className="mt-auto space-y-2.5 border-t border-border/60 pt-5 text-xs font-medium text-foreground sm:pt-6 sm:text-sm">
        {supportPoints.map((point) => (
          <li key={point} className="flex min-w-0 items-start gap-2">
            <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            <span className="min-w-0 break-words">{point}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  )
}
