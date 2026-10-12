import { SparklesIcon } from "lucide-react"
import Container from "@/components/Container"
import AssistantCoreCard from "@/components/home/cards/AssistantCoreCard"
import DoctorHelplineCard from "@/components/home/cards/DoctorHelplineCard"
import EcosystemReachCard from "@/components/home/cards/EcosystemReachCard"
import ExpoSpotlightCard from "@/components/home/cards/ExpoSpotlightCard"

export default function CorePillarsSection() {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="mb-8 min-w-0 space-y-3 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <SparklesIcon className="size-3.5" />
            Core Pillars
          </div>
          <h2
            style={{ fontSize: "clamp(1.625rem, 3vw, 2.5rem)" }}
            className="min-w-0 break-words font-heading font-bold tracking-tight text-foreground"
          >
            Digital Media, Marketplace, and Aerial Intelligence
          </h2>
        </div>

        {/* Bento Grid: single column on mobile, 12-col bento from lg */}
        <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-12">
          <ExpoSpotlightCard />
          <DoctorHelplineCard />
          <AssistantCoreCard />
          <EcosystemReachCard />
        </div>
      </Container>
    </section>
  )
}
