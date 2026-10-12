import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  BotIcon,
  CheckCircle2Icon,
  CompassIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchIcon,
} from "lucide-react"
import Container from "@/components/Container"
import { Button } from "@/components/ui/button"

const sampleQueries = [
  "What is DroneTV and what is its mission?",
  "What services and media coverage does DroneTV provide?",
  "What is Drone Doctor Help Line and technical support?",
]

export default function Home() {
  const triggerChat = () => {
    const chatBtn = document.querySelector<HTMLButtonElement>('button[aria-label*="Open chat"]')
    if (chatBtn) chatBtn.click()
  }

  return (
    <div className="w-full min-w-0">
      {/* ─── 1. Hero Section ───────────────────────────────────────── */}
      <section className="pt-8 sm:pt-14 pb-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Micro Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-foreground tracking-wide max-w-full leading-snug">
                <span className="size-2 shrink-0 rounded-full bg-primary animate-pulse" />
                <span>VOICE OF DRONE TECHNOLOGY, GIS & AI TECHNOLOGIES</span>
              </div>

              {/* Display Headline: clamp(2.5rem, 5vw, 4.25rem), max ~16 chars per line */}
              <h1
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", lineHeight: 1.05 }}
                className="font-heading font-black tracking-tight text-foreground max-w-[16ch]"
              >
                Uniting India&apos;s Drone Ecosystem with{" "}
                <span className="text-primary underline decoration-primary/40 underline-offset-8">
                  DroneTV
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                India&apos;s dedicated media platform and industry marketplace connecting drone manufacturers, commercial pilots, GIS specialists, enterprise buyers, and policymakers.
              </p>

              {/* Buttons: flex flex-wrap gap-3 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  render={<Link to="/services" />}
                  size="lg"
                  className="group rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3 text-sm shadow-sm hover:bg-primary/95 transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3"
                >
                  <span>Explore Services</span>
                  <span className="flex size-7 items-center justify-center rounded-xl bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                    <ArrowRightIcon className="size-3.5 stroke-[2.5]" />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={triggerChat}
                  className="rounded-xl border-border/80 bg-background/80 hover:bg-muted font-medium px-5 py-3 text-sm transition-all"
                >
                  <BotIcon className="mr-2 size-4 text-primary" />
                  Ask Assistant
                </Button>
              </div>

              {/* Trust Checks Row: flex flex-wrap gap-x-6 gap-y-2 text-sm */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                  <span>Official Drone Expo Media Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                  <span>24/7 Intelligent Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                  <span>Drone Doctor Help Line</span>
                </div>
              </div>
            </div>

            {/* Right Ecosystem Card (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs h-full">
                <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 border border-border/40 space-y-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        DroneTV Ecosystem Network
                      </span>
                    </div>
                    <span className="rounded-xl bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      Hyderabad, India
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-bold text-foreground">
                      Media & Marketplace Hub
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Showcasing innovations in UAV design, precision agriculture, LiDAR surveying, and AI aerial diagnostics across India.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="rounded-xl bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground uppercase font-bold">Featured Event</div>
                      <div className="font-semibold text-foreground mt-0.5 text-xs sm:text-sm">Drone Expo 2025</div>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground uppercase font-bold">Official Channel</div>
                      <div className="font-semibold text-foreground mt-0.5 text-xs sm:text-sm">@indiadronetv</div>
                    </div>
                  </div>

                  <Button
                    onClick={triggerChat}
                    className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs sm:text-sm shadow-xs py-2.5"
                  >
                    <BotIcon className="size-4 mr-1.5" />
                    <span>Connect with DroneTV Team</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. Partner Strip (Full-width borders, Container inside) ─── */}
      <section className="w-full border-y border-border/60 py-6 sm:py-8 bg-muted/10">
        <Container>
          <div className="grid lg:grid-cols-[260px_1fr] items-center gap-6 lg:gap-8">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground leading-relaxed">
              Collaborating with leading state departments and industry pioneers:
            </span>
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 font-heading font-semibold text-foreground/90 text-sm sm:text-base">
              <span>Telangana Govt</span>
              <span>Andhra Govt</span>
              <span>Corteva</span>
              <span>APGENCO</span>
              <span>IPAGE UMS</span>
              <span>Dev AI Labs</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 3. Core Pillars (Bento Grid) ───────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          {/* Section Header */}
          <div className="space-y-3 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <SparklesIcon className="size-3.5" />
              Core Pillars
            </div>
            <h2
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              className="font-heading font-bold tracking-tight text-foreground"
            >
              Digital Media, Marketplace, and Aerial Intelligence
            </h2>
          </div>

          {/* Bento Grid: 24px gaps, equal heights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Row 1, Card 1: Drone Expo & Industry Video Spotlight (lg:col-span-7) */}
            <div className="lg:col-span-7 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs h-full">
              <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col border border-border/40">
                <div className="space-y-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <CompassIcon className="size-6 stroke-[2]" />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Drone Expo & Industry Video Spotlight
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-prose mb-6">
                    Exclusive stall coverage, product showcases, and executive interviews from Drone Expo Hyderabad and Mumbai. Highlighting innovators including CropWings, Corteva, Carbon Light, XBOOM underwater drones, and RPTO leaders.
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-muted/50 p-2.5">
                    <div className="text-xs sm:text-sm font-bold font-mono text-foreground">Drone Expo</div>
                    <div className="text-xs text-muted-foreground uppercase font-medium">Media Partner</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-2.5">
                    <div className="text-xs sm:text-sm font-bold font-mono text-foreground">Mumbai & HYD</div>
                    <div className="text-xs text-muted-foreground uppercase font-medium">Expo Editions</div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-2.5">
                    <div className="text-xs sm:text-sm font-bold font-mono text-foreground">@indiadronetv</div>
                    <div className="text-xs text-muted-foreground uppercase font-medium">YouTube Channel</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 1, Card 2: Drone Doctor Help Line (lg:col-span-5) */}
            <div className="lg:col-span-5 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs h-full">
              <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col border border-border/40">
                <div className="space-y-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <WrenchIcon className="size-6 stroke-[2]" />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Drone Doctor Help Line
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Specialized technical helpline for commercial drone pilots, operators, and engineering teams.
                  </p>
                </div>

                <ul className="mt-auto pt-6 border-t border-border/60 space-y-2.5 text-xs sm:text-sm font-medium text-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                    <span>Firmware diagnostics & sensor calibration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                    <span>Hardware maintenance & repair advisories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                    <span>DGCA regulatory compliance assistance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Row 2, Card 1: Interactive Assistant Core (lg:col-span-5) */}
            <div className="lg:col-span-5 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs h-full">
              <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col border border-border/40">
                <div className="space-y-3">
                  <div className="flex h-11 items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <BotIcon className="size-6 stroke-[2]" />
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      24/7 Rule Engine
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Interactive Assistant Core
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Instant answers on DroneTV media coverage, Drone Doctor assistance, directory listings, and partner training.
                  </p>
                </div>

                {/* Suggested question buttons: wrap without ellipsis */}
                <div className="space-y-2 my-4">
                  {sampleQueries.map((query) => (
                    <button
                      key={query}
                      type="button"
                      onClick={triggerChat}
                      className="w-full flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/40 p-3 text-left text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.99]"
                    >
                      <span className="leading-snug break-words whitespace-normal">{query}</span>
                      <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                </div>

                <div className="mt-auto pt-2">
                  <Button
                    onClick={triggerChat}
                    className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs sm:text-sm shadow-xs py-2.5"
                  >
                    Open Full Assistant
                  </Button>
                </div>
              </div>
            </div>

            {/* Row 2, Card 2: Ecosystem Aggregation & Media Reach (lg:col-span-7) */}
            <div className="lg:col-span-7 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs h-full">
              <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col border border-border/40">
                <div className="space-y-3">
                  <div className="flex h-11 items-center">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <ShieldCheckIcon className="size-6 stroke-[2]" />
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Ecosystem Aggregation & Media Reach
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-prose">
                    Connecting drone innovators, GIS engineers, enterprise clients, and institutional authorities across India under a single digital hub.
                  </p>
                </div>

                {/* Stats row pushed to bottom with mt-auto, clamped typography */}
                <div className="mt-auto pt-6 border-t border-border/60 grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="min-w-0">
                    <div
                      style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
                      className="font-extrabold font-heading text-foreground leading-none whitespace-nowrap"
                    >
                      50+
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">
                      Partner Entities
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div
                      style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
                      className="font-extrabold font-heading text-foreground leading-none whitespace-nowrap"
                    >
                      2025
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">
                      Portal Launch
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div
                      style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
                      className="font-extrabold font-heading text-foreground leading-none whitespace-nowrap"
                    >
                      Hyderabad
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">
                      Headquarters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
