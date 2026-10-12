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
    <div className="flex flex-col gap-24 py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* ─── Hero Section (Asymmetrical Split Architecture) ─────────── */}
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center pt-4 sm:pt-10">
        <div className="space-y-6">
          {/* Micro Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold text-foreground tracking-wide">
            <span className="size-2 rounded-xl bg-primary animate-pulse" />
            <span>VOICE OF DRONE TECHNOLOGY, GIS & AI TECHNOLOGIES</span>
          </div>

          {/* Display Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground leading-[1.08]">
            Uniting India&apos;s Drone Ecosystem with{" "}
            <span className="text-primary underline decoration-primary/40 underline-offset-8">
              DroneTV
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-[54ch] leading-relaxed">
            India&apos;s dedicated media platform and industry marketplace connecting drone manufacturers, commercial pilots, GIS specialists, enterprise buyers, and policymakers.
          </p>

          {/* CTA Group with Button-in-Button Architecture */}
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

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>Official Drone Expo Media Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>24/7 Intelligent Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>Drone Doctor Help Line</span>
            </div>
          </div>
        </div>

        {/* ─── Hero Visual Card ────────────────────────────────────── */}
        <div className="rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
          <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 border border-border/40 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-xl bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  DroneTV Ecosystem Network
                </span>
              </div>
              <span className="rounded-xl bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Hyderabad, India
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-foreground">
                Media & Marketplace Hub
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Showcasing innovations in UAV design, precision agriculture, LiDAR surveying, and AI aerial diagnostics across India.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="rounded-xl bg-muted/50 p-3">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">Featured Event</div>
                <div className="font-semibold text-foreground mt-0.5">Drone Expo 2025</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-3">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">Official Channel</div>
                <div className="font-semibold text-foreground mt-0.5">@indiadronetv</div>
              </div>
            </div>

            <Button
              onClick={triggerChat}
              className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs py-2.5"
            >
              <BotIcon className="size-3.5 mr-1.5" />
              <span>Connect with DroneTV Team</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Social Proof & Industry Trust Strip ────────────────────── */}
      <section className="border-y border-border/60 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
          <span className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground/80">
            Collaborating with leading state departments and industry pioneers:
          </span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-heading font-semibold text-foreground/80 text-sm">
            <span>Telangana Govt</span>
            <span>Andhra Govt</span>
            <span>Corteva</span>
            <span>APGENCO</span>
            <span>IPAGE UMS</span>
            <span>Dev AI Labs</span>
          </div>
        </div>
      </section>

      {/* ─── Asymmetrical Bento Grid ─────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <SparklesIcon className="size-3.5" />
            Core Pillars
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Digital Media, Marketplace, and Aerial Intelligence
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Bento Tile 1 (Span 7): Drone Expo & Video Spotlight */}
          <div className="md:col-span-7 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <CompassIcon className="size-6 stroke-[2]" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Drone Expo & Industry Video Spotlight
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[50ch]">
                  Exclusive stall coverage, product showcases, and executive interviews from Drone Expo Hyderabad and Mumbai. Highlighting innovators including CropWings, Corteva, Carbon Light, XBOOM underwater drones, and RPTO leaders.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60 text-center">
                <div className="rounded-xl bg-muted/50 p-2.5">
                  <div className="text-sm font-bold font-mono text-foreground">Drone Expo</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">Media Partner</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-2.5">
                  <div className="text-sm font-bold font-mono text-foreground">Mumbai & HYD</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">Expo Editions</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-2.5">
                  <div className="text-sm font-bold font-mono text-foreground">@indiadronetv</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">YouTube Channel</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Tile 2 (Span 5): Drone Doctor Technical Support */}
          <div className="md:col-span-5 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <WrenchIcon className="size-6 stroke-[2]" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Drone Doctor Help Line
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Specialized technical helpline for commercial drone pilots, operators, and engineering teams.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-medium text-foreground">
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

          {/* Bento Tile 3 (Span 5): Interactive Chatbot Core */}
          <div className="md:col-span-5 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-5 border border-border/40">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <BotIcon className="size-5" />
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-xl bg-emerald-500 animate-pulse" />
                    24/7 Rule Engine
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Interactive Assistant Core
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Instant answers on DroneTV media coverage, Drone Doctor assistance, directory listings, and partner training.
                </p>
              </div>

              <div className="space-y-1.5">
                {sampleQueries.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={triggerChat}
                    className="w-full flex items-center justify-between rounded-xl border border-border/70 bg-muted/40 px-3 py-2 text-left text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.99]"
                  >
                    <span className="truncate">{query}</span>
                    <ArrowRightIcon className="size-3 shrink-0 ml-2 text-muted-foreground" />
                  </button>
                ))}
              </div>

              <Button
                onClick={triggerChat}
                className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs"
              >
                Open Full Assistant
              </Button>
            </div>
          </div>

          {/* Bento Tile 4 (Span 7): Verified Industry Footprint */}
          <div className="md:col-span-7 rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <ShieldCheckIcon className="size-6 stroke-[2]" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Ecosystem Aggregation & Media Reach
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connecting drone innovators, GIS engineers, enterprise clients, and institutional authorities across India under a single digital hub.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">50+</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Partner Entities</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">2025</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Portal Launch</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">Hyderabad</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Headquarters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
