import { Link } from "react-router-dom"
import { ArrowRightIcon, BotIcon, CheckCircle2Icon } from "lucide-react"
import Container from "@/components/Container"
import BentoCard from "@/components/home/BentoCard"
import { Button } from "@/components/ui/button"
import { triggerChat } from "@/lib/triggerChat"

const trustChecks = [
  "Official Drone Expo Media Partner",
  "24/7 Intelligent Assistant",
  "Drone Doctor Help Line",
]

const hubHighlights = [
  { label: "Featured Event", value: "Drone Expo 2025" },
  { label: "Official Channel", value: "@indiadronetv" },
]

export default function HeroSection() {
  return (
    <section className="w-full pt-6 pb-14 sm:pt-10 sm:pb-16 lg:pt-14">
      <Container>
        <div className="grid min-w-0 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column (lg:col-span-7) */}
          <div className="min-w-0 space-y-5 lg:col-span-7 sm:space-y-6">
            {/* Micro Eyebrow */}
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold leading-snug tracking-wide text-foreground sm:text-xs">
              <span className="size-2 shrink-0 rounded-full bg-primary animate-pulse" />
              <span className="min-w-0 break-words">
                VOICE OF DRONE TECHNOLOGY, GIS &amp; AI TECHNOLOGIES
              </span>
            </div>

            {/* Display Headline: fluid clamp, safe on 320px screens */}
            <h1
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)", lineHeight: 1.05 }}
              className="max-w-[16ch] break-words font-heading font-black tracking-tight text-foreground"
            >
              Uniting India&apos;s Drone Ecosystem with{" "}
              <span className="text-primary underline decoration-primary/40 underline-offset-8">
                DroneTV
              </span>
            </h1>

            {/* Subtext */}
            <p className="max-w-xl break-words text-base leading-relaxed text-muted-foreground sm:text-lg">
              India&apos;s dedicated media platform and industry marketplace connecting drone
              manufacturers, commercial pilots, GIS specialists, enterprise buyers, and policymakers.
            </p>

            {/* Buttons: wrap cleanly on narrow screens */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                render={<Link to="/services" />}
                size="lg"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/95 active:scale-[0.98]"
              >
                <span>Explore Services</span>
                <span className="flex size-7 items-center justify-center rounded-xl bg-primary-foreground/10 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-1">
                  <ArrowRightIcon className="size-3.5 stroke-[2.5]" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={triggerChat}
                className="rounded-xl border-border/80 bg-background/80 px-5 py-3 text-sm font-medium transition-all hover:bg-muted"
              >
                <BotIcon className="mr-2 size-4 text-primary" />
                Ask Assistant
              </Button>
            </div>

            {/* Trust Checks Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm font-medium text-muted-foreground sm:gap-x-6">
              {trustChecks.map((check) => (
                <div key={check} className="flex min-w-0 items-center gap-2">
                  <CheckCircle2Icon className="size-4 shrink-0 text-emerald-500" />
                  <span className="break-words">{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Ecosystem Card (lg:col-span-5) */}
          <div className="min-w-0 lg:col-span-5">
            <BentoCard innerClassName="justify-between space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="min-w-0 break-words text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">
                    DroneTV Ecosystem Network
                  </span>
                </div>
                <span className="shrink-0 rounded-xl bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Hyderabad, India
                </span>
              </div>

              <div className="min-w-0 space-y-3">
                <div className="break-words text-sm font-bold text-foreground">
                  Media &amp; Marketplace Hub
                </div>
                <p className="break-words text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Showcasing innovations in UAV design, precision agriculture, LiDAR surveying, and AI
                  aerial diagnostics across India.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                {hubHighlights.map((item) => (
                  <div key={item.label} className="min-w-0 rounded-xl bg-muted/50 p-3">
                    <div className="break-words text-xs font-bold uppercase text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="mt-0.5 break-words text-xs font-semibold text-foreground sm:text-sm">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={triggerChat}
                className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 sm:text-sm"
              >
                <BotIcon className="mr-1.5 size-4" />
                <span>Connect with DroneTV Team</span>
              </Button>
            </BentoCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
