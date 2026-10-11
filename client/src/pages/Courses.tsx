import { Link } from "react-router-dom"
import {
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  GraduationCapIcon,
  SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
    price: "$280 / 28,000",
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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <GraduationCapIcon className="size-3.5" />
          Certified Training Programs
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Explore Open Drone Courses
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          From basic pilot licenses to advanced AI data mapping, launch your career with
          our hands-on certification tracks.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col justify-between rounded-2xl border-border bg-card shadow-xs hover:border-primary/50 transition-colors">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span className="rounded-md bg-muted px-2.5 py-0.5">{course.level}</span>
                <span className="flex items-center gap-1 text-primary font-bold">
                  <DollarSignIcon className="size-3.5" />
                  {course.price}
                </span>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                {course.title}
              </CardTitle>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ClockIcon className="size-3.5 text-primary" />
                <span>{course.duration}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p className="leading-relaxed">{course.description}</p>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {course.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckIcon className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-2 flex gap-3">
              <Button onClick={triggerChatWithQuestion} className="w-full rounded-xl">
                <SparklesIcon className="mr-1.5 size-3.5" />
                Ask Chatbot / Register
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
