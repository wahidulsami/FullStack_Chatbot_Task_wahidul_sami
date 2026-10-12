import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  CameraIcon,
  CheckCircle2Icon,
  CompassIcon,
  FactoryIcon,
  LeafIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: CompassIcon,
    title: "Topographical Survey & GIS Mapping",
    description:
      "Sub-centimeter accuracy orthomosaics, digital surface models (DSM), and volumetric cut/fill computations for construction and civil engineering.",
    benefits: [
      "RTK-calibrated GPS coordinates",
      "CAD & GIS compatible outputs (GeoTIFF, DXF)",
      "Boundary and contour line elevation mapping",
    ],
  },
  {
    icon: FactoryIcon,
    title: "Industrial & Solar Plant Inspection",
    description:
      "Thermal infrared audits to detect defective solar cells, pipeline cracks, transmission line hotspots, and wind turbine damage without system downtime.",
    benefits: [
      "Radiometric thermal imagery reports",
      "Automated hotspot and anomaly tagging",
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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-12">
      {/* Header with Double-Bezel Framing */}
      <div className="rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
        <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-8 sm:p-10 border border-border/40 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <SparklesIcon className="size-3.5" />
            Enterprise Aerial Solutions
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Commercial Drone Services
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From high-precision surveying to industrial thermal audits, our certified drone fleet
            delivers fast, actionable insights for your business operations.
          </p>
        </div>
      </div>

      {/* Services Grid with Double-Bezel Framing */}
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs hover:border-primary/50 transition-colors"
          >
            <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <service.icon className="size-6 stroke-[2]" />
                </span>

                <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  {service.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 text-xs text-foreground font-medium pt-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <CheckCircle2Icon className="size-3.5 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                <Button
                  onClick={triggerChat}
                  className="group flex-1 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs py-2.5 transition-all active:scale-[0.98]"
                >
                  <span>Request Quote via Chat</span>
                  <ArrowRightIcon className="ml-1.5 size-3 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  variant="outline"
                  render={<Link to="/contact" />}
                  className="rounded-xl text-xs px-4"
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
