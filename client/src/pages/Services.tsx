import { Link } from "react-router-dom"
import {
  CameraIcon,
  CheckCircle2Icon,
  CompassIcon,
  FactoryIcon,
  LeafIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: CompassIcon,
    title: "Topographical Survey & GIS Mapping",
    description:
      "Sub-centimeter accuracy orthomosaics, digital surface models (DSM), and volumetric cut/fill computations for construction and civil engineering.",
    benefits: [
      "RTK-calibrated GPS coordinates",
      "CAD & GIS compatible outputs (GeoTIFF, DXF)",
      "Boundary & contour line elevation mapping",
    ],
  },
  {
    icon: FactoryIcon,
    title: "Industrial & Solar Plant Inspection",
    description:
      "Thermal infrared audits to detect defective solar cells, pipeline cracks, transmission line hotspots, and wind turbine damage without system downtime.",
    benefits: [
      "Radiometric thermal imagery reports",
      "Automated hotspot & anomaly tagging",
      "Zero personnel risk on hazardous sites",
    ],
  },
  {
    icon: LeafIcon,
    title: "Precision Agriculture & Crop Spraying",
    description:
      "Multispectral NDVI analysis for soil moisture, pest infestation, and nitrogen balance, paired with automated agricultural spraying drones.",
    benefits: [
      "90% water saving compared to manual methods",
      "Targeted fertilizer/pesticide distribution",
      "Early disease diagnosis maps",
    ],
  },
  {
    icon: CameraIcon,
    title: "Cinematic Aerial Media & Event Coverage",
    description:
      "4K/6K HDR aerial cinematography, corporate promos, live event broadcasting, and real-estate showcase video production.",
    benefits: [
      "Licensed and insured flight crews",
      "Dynamic FPV and stabilized heavy-lift drones",
      "Professional post-production and editing",
    ],
  },
]

export default function Services() {
  const triggerChat = () => {
    const chatBtn = document.querySelector<HTMLButtonElement>('button[aria-label*="Open chat"]')
    if (chatBtn) chatBtn.click()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <SparklesIcon className="size-3.5" />
          Enterprise Aerial Solutions
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Professional Drone Services
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          From high-precision surveying to industrial thermal audits, our certified drone fleet
          delivers fast, actionable insights for your business.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col justify-between rounded-2xl border-border bg-card shadow-xs hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <service.icon className="size-6" />
              </span>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p className="leading-relaxed">{service.description}</p>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-2 flex gap-3">
              <Button onClick={triggerChat} className="w-full rounded-xl">
                Request Quote via Chat
              </Button>
              <Button variant="outline" render={<Link to="/contact" />} className="rounded-xl">
                Contact
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
