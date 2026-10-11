import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  BotIcon,
  CheckCircle2Icon,
  CompassIcon,
  GraduationCapIcon,
  PlaneTakeoffIcon,
  RadioIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sampleQueries = [
  "What courses / training are available?",
  "What are the course fees and pricing?",
  "What is the course duration and schedule?",
  "How can I register / enroll?",
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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold text-foreground tracking-wide">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span>DGCA ACCREDITED FLIGHT ACADEMY</span>
          </div>

          {/* Display Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground leading-[1.08]">
            Master Autonomous Skies with{" "}
            <span className="text-primary underline decoration-primary/40 underline-offset-8">
              DroneTV Academy
            </span>
          </h1>

          {/* Subtext (under 20 words, tight and crisp) */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-[54ch] leading-relaxed">
            Professional pilot certifications, high-precision GIS mapping, and intelligent rule-based aerial advisory services.
          </p>

          {/* CTA Group with Button-in-Button Architecture */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              render={<Link to="/courses" />}
              size="lg"
              className="group rounded-full bg-primary text-primary-foreground font-semibold px-6 py-3 text-sm shadow-sm hover:bg-primary/95 transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3"
            >
              <span>Explore Programs</span>
              <span className="flex size-7 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                <ArrowRightIcon className="size-3.5 stroke-[2.5]" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={triggerChat}
              className="rounded-full border-border/80 bg-background/80 hover:bg-muted font-medium px-5 py-3 text-sm transition-all"
            >
              <BotIcon className="mr-2 size-4 text-primary" />
              Ask Assistant
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>Certified DGCA Curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>Bilingual Core (English & বাংলা)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>16+ Supervised Flight Hours</span>
            </div>
          </div>
        </div>

        {/* ─── Hero Visual: Double-Bezel Telemetry HUD ────────────────── */}
        <div className="relative group">
          {/* Outer Shell (Concentric Doppelrand) */}
          <div className="rounded-[2.2rem] p-2 bg-muted/40 border border-border/80 shadow-xl ring-1 ring-border/20 backdrop-blur-md">
            {/* Inner Core */}
            <div className="relative rounded-[calc(2.2rem-0.5rem)] overflow-hidden bg-card border border-border/40 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://picsum.photos/seed/dronetv-sky-falcon/900/650"
                alt="DroneTV autonomous flight inspection"
                className="size-full object-cover brightness-90 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* HUD Telemetry Overlay Pills */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/15">
                  <RadioIcon className="size-3 text-emerald-400 animate-pulse" />
                  UAV-07 ACTIVE
                </span>
                <span className="rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/15">
                  RTK FIX: 24 SATS
                </span>
              </div>

              {/* Bottom Card Info Strip */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/75 p-3.5 backdrop-blur-md border border-white/15 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Autonomous Flight Lab</div>
                    <div className="text-[11px] text-white/70">Geospatial Survey & AI Sensor Suite</div>
                  </div>
                  <button
                    type="button"
                    onClick={triggerChat}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-transform active:scale-95"
                  >
                    Quick Query
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof & Industry Trust Strip ────────────────────── */}
      <section className="border-y border-border/60 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
          <span className="uppercase tracking-wider text-[10px] font-bold text-muted-foreground/80">
            Trusted by operators across civil aviation & geospatial sectors:
          </span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-heading font-semibold text-foreground/80 text-sm">
            <span>SkyVector Labs</span>
            <span>AeroGrid GIS</span>
            <span>TerraSurvey</span>
            <span>Apex Optics</span>
          </div>
        </div>
      </section>

      {/* ─── Asymmetrical Bento Grid ─────────────────────────────────── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <SparklesIcon className="size-3.5" />
            Core Capabilities
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Aviation Rigor Meets Aerial Intelligence
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Bento Tile 1 (Span 7): Photogrammetry & Survey */}
          <div className="md:col-span-7 rounded-[2rem] p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(2rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <CompassIcon className="size-6 stroke-[2]" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Sub-Centimeter Photogrammetry & GIS
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[50ch]">
                  High-accuracy orthomosaics, digital surface models, and 3D point cloud generation. Built on RTK GPS workflows and industrial data standards.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60 text-center">
                <div className="rounded-xl bg-muted/50 p-2.5">
                  <div className="text-lg font-bold font-mono text-foreground">1.2 cm</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">GSD Accuracy</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-2.5">
                  <div className="text-lg font-bold font-mono text-foreground">Pix4D</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">Certified Pipeline</div>
                </div>
                <div className="rounded-xl bg-muted/50 p-2.5">
                  <div className="text-lg font-bold font-mono text-foreground">LiDAR</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-medium">Sensor Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Tile 2 (Span 5): Pilot Certification */}
          <div className="md:col-span-5 rounded-[2rem] p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(2rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <GraduationCapIcon className="size-6 stroke-[2]" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  DGCA Commercial Pilot Pathway
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Structured syllabus covering airspace law, meteorology, emergency procedures, and hands-on logbook hours.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-medium text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                  <span>Ground School & Simulator Flight Practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                  <span>DGCA Practical Assessment & Certification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-emerald-500 shrink-0" />
                  <span>Career Placement Network with Tech Operators</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bento Tile 3 (Span 5): Interactive Chatbot Core */}
          <div className="md:col-span-5 rounded-[2rem] p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(2rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-5 border border-border/40">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <BotIcon className="size-5" />
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    24/7 Rule Engine
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Interactive Assistant Core
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Instant answers on pricing, duration, batch timings, and seat registration in English or বাংলা.
                </p>
              </div>

              <div className="space-y-1.5">
                {sampleQueries.slice(0, 3).map((query) => (
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
                className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs"
              >
                Open Full Assistant
              </Button>
            </div>
          </div>

          {/* Bento Tile 4 (Span 7): Real Field Metrics */}
          <div className="md:col-span-7 rounded-[2rem] p-1.5 bg-muted/40 border border-border/80 shadow-xs">
            <div className="rounded-[calc(2rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <ShieldCheckIcon className="size-6 stroke-[2]" />
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Verified Industry Track Record
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our graduates operate across utility inspection, precision agriculture, and film cinematography worldwide.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">540+</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Licensed Pilots</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">99.2%</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Exam Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">14,200</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">Hectares Mapped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
