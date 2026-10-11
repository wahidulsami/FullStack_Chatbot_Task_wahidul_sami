import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  BotIcon,
  CheckCircle2Icon,
  GraduationCapIcon,
  PlaneTakeoffIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: GraduationCapIcon,
    title: "DGCA Certified Training",
    description:
      "Hands-on remote pilot certification with advanced simulators and actual field flight hours.",
  },
  {
    icon: PlaneTakeoffIcon,
    title: "Commercial Drone Operations",
    description:
      "Topographical survey, land mapping, crop health monitoring, and enterprise infrastructure inspection.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Industry Credentialing",
    description:
      "Verified pilot certifications and portfolio mentorship to connect you directly with tech employers.",
  },
]

const sampleQuestions = [
  "What courses / training are available?",
  "What are the course fees and pricing?",
  "What is the course duration and schedule?",
  "How can I register / enroll?",
]

export default function Home() {
  const triggerChat = () => {
    // Dispatch a click on the floating chat launcher button
    const chatBtn = document.querySelector<HTMLButtonElement>('button[aria-label*="Open chat"]')
    if (chatBtn) {
      chatBtn.click()
    }
  }

  return (
    <div className="flex flex-col gap-16 py-10 px-4 max-w-6xl mx-auto">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="text-center space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-foreground">
          <SparklesIcon className="size-3.5 text-primary" />
          <span>Next-Generation Aerial Intelligence & Training</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
          Master the Skies with <span className="text-primary underline decoration-primary/40 underline-offset-8">DroneTV Academy</span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Comprehensive drone pilot certifications, GIS surveying, and AI aerial services.
          Get instant guidance from our intelligent rule-based chatbot anytime.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button render={<Link to="/courses" />} size="lg" className="rounded-xl font-medium">
            Explore Courses
            <ArrowRightIcon className="ml-1.5 size-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={triggerChat}
            className="rounded-xl font-medium"
          >
            <BotIcon className="mr-1.5 size-4 text-primary" />
            Ask Assistant
          </Button>

          <Button
            variant="ghost"
            render={<Link to="/contact" />}
            size="lg"
            className="rounded-xl font-medium"
          >
            Contact Us
          </Button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2Icon className="size-4 text-emerald-500" />
            DGCA Approved Syllabus
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2Icon className="size-4 text-emerald-500" />
            Bilingual AI Assistant (English & বাংলা)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2Icon className="size-4 text-emerald-500" />
            Hands-on Flying Assessments
          </span>
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────────────────────── */}
      <section className="grid gap-6 md:grid-cols-3">
        {features.map((item) => (
          <Card key={item.title} className="rounded-2xl border-border bg-card/70 shadow-xs hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <item.icon className="size-6" />
              </span>
              <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* ─── Chatbot Showcase Section ─────────────────────────────── */}
      <section className="rounded-3xl border border-border bg-gradient-to-b from-card to-muted/30 p-6 sm:p-10 shadow-xs">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <BotIcon className="size-3.5" />
              Rule-Based Intelligent Assistant
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Instant Answers to All Your Questions
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Our 24/7 chatbot provides fast, reliable information on course fees, class schedules,
              and registration in English or বাংলা. Try asking:
            </p>

            <div className="space-y-2 pt-2">
              {sampleQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={triggerChat}
                  className="flex w-full items-center justify-between rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5"
                >
                  <span>"{q}"</span>
                  <span className="text-xs text-primary font-semibold">Try now →</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <BotIcon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">DroneTV Assistant</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  ● Ready to assist you
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Click the floating yellow chat bubble in the bottom right corner of your screen to expand
              the assistant or enjoy full-screen conversation mode!
            </p>
            <Button onClick={triggerChat} className="w-full rounded-xl">
              Launch Assistant
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
