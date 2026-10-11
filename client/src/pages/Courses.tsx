import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  GraduationCapIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const courses = [
  {
    title: "Remote Pilot Certification (DGCA)",
    level: "Beginner to Intermediate",
    price: "$150 / ৳15,000",
    duration: "4 Weeks (16 Flight Hours)",
    description:
      "Official pilot certification covering drone aerodynamics, airspace safety regulations, simulation flying, and field flight maneuvers.",
    features: [
      "DGCA-approved syllabus",
      "Hands-on field flight practice",
      "Emergency recovery procedures",
      "Official certificate upon passing",
    ],
  },
  {
    title: "GIS Survey & Photogrammetry",
    level: "Intermediate",
    price: "$280 / ৳28,000",
    duration: "4 Weeks (Weekend Batches)",
    description:
      "Learn high-precision aerial mapping, ground control points (GCPs), ortho-mosaic generation, and digital elevation models (DEM).",
    features: [
      "Pix4D & DJI Terra workflow",
      "RTK/PPK accuracy calibration",
      "Contour & volumetric analysis",
      "Real-world survey project",
    ],
  },
  {
    title: "Precision Agriculture Drone Operations",
    level: "All Levels",
    price: "$220 / ৳22,000",
    duration: "2 Weeks Intensive",
    description:
      "Master crop scouting, multispectral NDVI indexing, pesticide spraying drone configurations, and agricultural field management.",
    features: [
      "Multispectral camera calibration",
      "Spraying drone safety & payloads",
      "Crop stress health diagnostics",
      "Agri-tech enterprise workflows",
    ],
  },
  {
    title: "Advanced Drone AI & Computer Vision",
    level: "Advanced",
    price: "$450 / ৳45,000",
    duration: "8 Weeks Project-Based",
    description:
      "Automated infrastructure inspection, AI defect classification, thermal solar audit, and deep learning pipeline integration for drone video feeds.",
    features: [
      "YOLO object detection on aerial video",
      "Thermal solar panel inspection",
      "Automated mission planning APIs",
      "Industry portfolio review",
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
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <GraduationCapIcon className="size-3.5" />
          Certified Training Programs
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Explore Flight Academy Programs
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          From basic pilot licenses to advanced AI data mapping, launch your career with
          our hands-on certification tracks.
        </p>
      </div>

      {/* Courses Grid with Double-Bezel Framing */}
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.title}
            className="rounded-[2rem] p-1.5 bg-muted/40 border border-border/80 shadow-xs hover:border-primary/50 transition-colors"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-card p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-border/40">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 text-primary font-bold text-sm">
                    <DollarSignIcon className="size-4" />
                    {course.price}
                  </span>
                </div>

                <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  {course.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <ClockIcon className="size-3.5 text-primary" />
                  <span>{course.duration}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {course.description}
                </p>

                <ul className="space-y-2 text-xs text-foreground font-medium pt-2">
                  {course.features.map((f) => (
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
                  className="group flex-1 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs shadow-xs py-2.5 transition-all active:scale-[0.98]"
                >
                  <SparklesIcon className="mr-1.5 size-3.5" />
                  <span>Enquire / Register</span>
                  <ArrowRightIcon className="ml-1.5 size-3 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  variant="outline"
                  render={<Link to="/contact" />}
                  className="rounded-full text-xs px-4"
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
