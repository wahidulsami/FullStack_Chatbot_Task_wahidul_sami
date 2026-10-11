import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import EnquiryForm from "@/components/EnquiryForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const contactInfo = [
  { label: "Email", value: "hello@chatbotacademy.com", icon: MailIcon },
  { label: "Phone", value: "+880 1712 345678", icon: PhoneIcon },
  { label: "Office", value: "Dhaka, Bangladesh", icon: MapPinIcon },
]

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Contact us
        </h1>
        <p className="mt-3 text-muted-foreground">
          Have a question about our courses or services? Fill in the form and our team will get
          back to you within one business day.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {contactInfo.map((item) => (
            <Card key={item.label} size="sm">
              <CardHeader className="flex-row items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <item.icon className="size-4" />
                </span>
                <div>
                  <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
                  <CardContent className="px-0 text-sm text-foreground">{item.value}</CardContent>
                </div>
              </CardHeader>
            </Card>
          ))}
          <Card size="sm" className="bg-accent">
            <CardHeader className="flex-row items-center gap-3">
              <ClockIcon className="size-4 text-accent-foreground" />
              <div>
                <CardTitle className="text-sm text-accent-foreground">Office hours</CardTitle>
                <CardContent className="px-0 text-sm text-accent-foreground/80">
                  Saturday - Thursday, 9:00 AM - 6:00 PM (GMT+6)
                </CardContent>
              </div>
            </CardHeader>
          </Card>
        </div>

        <EnquiryForm />
      </div>
    </div>
  )
}
