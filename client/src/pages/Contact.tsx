import {
  BotIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareIcon,
  PhoneIcon,
  SparklesIcon,
} from "lucide-react"
import EnquiryForm from "@/components/EnquiryForm"
import { Button } from "@/components/ui/button"

const contactItems = [
  {
    label: "Official Email",
    value: "hello@chatbotacademy.com",
    hint: "Replies within one business day",
    icon: MailIcon,
  },
  {
    label: "Direct Phone & WhatsApp",
    value: "+880 1712 345678",
    hint: "Admissions & emergency flight support",
    icon: PhoneIcon,
  },
  {
    label: "Academy Headquarters",
    value: "Dhaka, Bangladesh & Hyderabad, India",
    hint: "Flight simulator & training center",
    icon: MapPinIcon,
  },
]

export default function Contact() {
  const triggerChat = () => {
    const chatBtn = document.querySelector<HTMLButtonElement>('button[aria-label*="Open chat"]')
    if (chatBtn) chatBtn.click()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <MessageSquareIcon className="size-3.5" />
          Direct Communication Hub
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Contact Flight Academy
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Have questions regarding pilot licenses, enterprise surveys, or course fees?
          Submit an enquiry or message our team.
        </p>
      </div>

      {/* Grid: Contact Information Cards + Direct Enquiry Form */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
        {/* Left Column: Contact Cards with Double-Bezel Architecture */}
        <div className="space-y-4">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.8rem] p-1.5 bg-muted/40 border border-border/80 shadow-2xs hover:border-primary/50 transition-colors"
            >
              <div className="rounded-[calc(1.8rem-0.375rem)] bg-card border border-border/40 p-4 sm:p-5 flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <item.icon className="size-5 stroke-[2]" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground mt-0.5 truncate">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {item.hint}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Operational Hours Card */}
          <div className="rounded-[1.8rem] p-1.5 bg-muted/40 border border-border/80 shadow-2xs">
            <div className="rounded-[calc(1.8rem-0.375rem)] bg-card border border-border/40 p-4 sm:p-5 flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <ClockIcon className="size-5 stroke-[2]" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Operating Hours
                </div>
                <div className="text-sm font-semibold text-foreground mt-0.5">
                  Saturday - Thursday, 9:00 AM - 6:00 PM
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Admissions desk & flight simulator laboratory
                </div>
              </div>
            </div>
          </div>

          {/* Instant Assistant Callout */}
          <div className="rounded-[1.8rem] p-1.5 bg-primary/10 border border-primary/25 shadow-2xs">
            <div className="rounded-[calc(1.8rem-0.375rem)] bg-card/90 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <BotIcon className="size-4" />
                <span>Prefer Instant Answers?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our 24/7 rule-based chatbot answers course fees, schedule questions, and admission steps instantly in English or বাংলা.
              </p>
              <Button
                onClick={triggerChat}
                className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs"
              >
                <SparklesIcon className="size-3.5 mr-1.5" />
                Ask Assistant Now
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Enquiry Form */}
        <EnquiryForm />
      </div>
    </div>
  )
}
