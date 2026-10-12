import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  CheckIcon,
  GraduationCapIcon,
  InfoIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const learningTracks = [
  {
    title: "DGCA Remote Pilot Certification",
    category: "RPTO Partner Pathway",
    level: "Beginner to Professional",
    pricingNote: "Fee confirmed via verified RPTO partner",
    scheduleNote: "Flexible batches through authorized institutes",
    description:
      "Accredited pilot training covering airspace regulations, simulator flight hours, emergency procedures, and field flight assessments for official DGCA licensing.",
    features: [
      "DGCA-approved flight syllabus",
      "Hands-on simulator and field flight practice",
      "Emergency procedures and safety protocols",
      "Direct connection with authorized RPTO partners",
    ],
  },
  {
    title: "GIS Aerial Surveying & Photogrammetry",
    category: "Geospatial Partner Track",
    level: "Intermediate",
    pricingNote: "Fee confirmed via training partner",
    scheduleNote: "Weekend and intensive options available",
    description:
      "High-precision mapping curriculum covering Ground Control Points (GCPs), RTK/PPK calibration, orthomosaics, and Digital Surface Models (DSM).",
    features: [
      "Industry photogrammetry workflows",
      "RTK and PPK coordinate calibration",
      "Contour, elevation, and volumetric calculations",
      "Practical project reviews with GIS specialists",
    ],
  },
  {
    title: "Precision Agriculture Drone Operations",
    category: "Agri-Tech Partner Track",
    level: "All Levels",
    pricingNote: "Fee confirmed via training partner",
    scheduleNote: "Seasonal and customized batch schedules",
    description:
      "Operational training focusing on multispectral crop health analytics, vegetation index (NDVI) mapping, and agricultural spraying drone safety.",
    features: [
      "Multispectral sensor calibration and data analysis",
      "Spraying drone payload safety and flight planning",
      "Crop stress detection and diagnostics",
      "Enterprise workflows for smart agriculture",
    ],
  },
  {
    title: "Drone AI & Thermal Infrastructure Inspection",
    category: "Industrial Inspection Track",
    level: "Advanced",
    pricingNote: "Fee confirmed via training partner",
    scheduleNote: "Project-based schedule with partner mentors",
    description:
      "Advanced industrial curriculum on radiometric thermal audits, AI-assisted defect classification, and aerial data post-processing pipelines.",
    features: [
      "Thermal sensor inspection for solar and utilities",
      "AI defect identification pipelines",
      "Automated inspection mission flight parameters",
      "Real-world industrial case studies",
    ],
  },
]

export default function Courses() {
  const triggerChatWithQuestion = () => {
    const chatBtn = document.querySelector<HTMLButtonElement>('button[aria-label*="Open chat"]')
    if (chatBtn) chatBtn.click()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-12">
      {/* Header with Double-Bezel Framing */}
      <div className="rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs">
        <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-8 sm:p-10 border border-border/40 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <GraduationCapIcon className="size-3.5" />
            Ecosystem Training & Certification
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Drone & GIS Learning Pathways
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            DroneTV collaborates with authorized Remote Pilot Training Organizations (RPTOs), universities, and training institutes across India to connect aspiring pilots with certified courses.
          </p>
        </div>
      </div>

      {/* Verified Transparency Notice */}
      <div className="rounded-xl p-1.5 bg-amber-500/10 border border-amber-500/20 shadow-xs">
        <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-5 sm:p-6 border border-border/40 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <InfoIcon className="size-5" />
          </span>
          <div className="space-y-1 flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Verified Partner Policy
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              DroneTV is a media platform and industry aggregator. We do not host proprietary courses or publish unverified tuition rates. Course fees, batch schedules, and seat admissions are managed directly by affiliated DGCA RPTO centers. Submit an enquiry to connect with verified partner institutes.
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid with Double-Bezel Framing */}
      <div className="grid gap-6 md:grid-cols-2">
        {learningTracks.map((track) => (
          <div
            key={track.title}
            className="rounded-xl p-1.5 bg-muted/40 border border-border/80 shadow-xs hover:border-primary/50 transition-colors"
          >
            <div className="rounded-[calc(1.225rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="rounded-xl bg-muted px-3 py-1 text-muted-foreground">
                    {track.level}
                  </span>
                  <span className="flex items-center gap-1 text-primary font-bold text-xs">
                    <ShieldCheckIcon className="size-3.5" />
                    {track.category}
                  </span>
                </div>

                <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  {track.title}
                </h2>

                <div className="space-y-1 text-xs text-muted-foreground font-medium">
                  <div className="text-foreground font-semibold">
                    {track.pricingNote}
                  </div>
                  <div>
                    {track.scheduleNote}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {track.description}
                </p>

                <ul className="space-y-2 text-xs text-foreground font-medium pt-2">
                  {track.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckIcon className="size-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                <Button
                  onClick={triggerChatWithQuestion}
                  className="group flex-1 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs py-2.5 transition-all active:scale-[0.98]"
                >
                  <SparklesIcon className="mr-1.5 size-3.5" />
                  <span>Enquire for Partner Details</span>
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
