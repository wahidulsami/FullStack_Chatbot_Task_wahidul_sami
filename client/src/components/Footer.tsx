import { Link } from "react-router-dom"
import {
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PlaneTakeoffIcon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react"
import Container from "@/components/Container"

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-card text-foreground overflow-hidden">
      {/* ─── Top Grid: Links & Verified Information (Inside Container) ── */}
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          {/* Brand Info & Address (Col 1) */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 font-heading text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <PlaneTakeoffIcon className="size-5 stroke-[2.2]" />
              </span>
              <span className="flex items-center gap-1.5">
                <span>DroneTV</span>
                <span className="text-muted-foreground font-medium">.in</span>
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The Voice of Drone Technology, GIS, and AI Technologies in India. Uniting pilots, manufacturers, enterprise buyers, and policymakers under an integrated media and marketplace platform. Founded by Dev R.
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPinIcon className="size-4 shrink-0 text-primary mt-1" />
                <span>DroneTv 5A/6B, White Waters, Timber Lake Colony, Shaikpet, Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="size-4 shrink-0 text-primary" />
                <a href="mailto:bd@dronetv.in" className="hover:text-foreground transition-colors font-medium">
                  bd@dronetv.in
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <PhoneIcon className="size-4 shrink-0 text-primary" />
                <span className="font-mono text-sm">+91 8882210038 / +91 9354688923</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Navigation</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-foreground transition-colors">
                  Courses & RPTO Tracks
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-foreground transition-colors">
                  Services & Media Coverage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact & Direct Enquiry
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-foreground transition-colors">
                  Admin Login Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Ecosystem</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="flex items-center gap-1.5">
                  <span>Drone Expo 2025</span>
                  <span className="rounded-xl bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                    Media Partner
                  </span>
                </span>
              </li>
              <li>
                <span>Drone Doctor Help Line</span>
              </li>
              <li>
                <span>GIS & Surveying Tracks</span>
              </li>
              <li>
                <span>UAV Hardware Directory</span>
              </li>
              <li>
                <span>DGCA Pilot Certification</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Verified Channels</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://youtube.com/@indiadronetv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <VideoIcon className="size-4 text-red-500 shrink-0" />
                  <span>YouTube (@indiadronetv)</span>
                  <ExternalLinkIcon className="size-3 opacity-60 ml-auto shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dronetv.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <SparklesIcon className="size-4 text-pink-500 shrink-0" />
                  <span>Instagram (@dronetv.in)</span>
                  <ExternalLinkIcon className="size-3 opacity-60 ml-auto shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/indiadronetv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <span>X / Twitter (@indiadronetv)</span>
                  <ExternalLinkIcon className="size-3 opacity-60 ml-auto shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/dronetv.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <span>Facebook (dronetv.in)</span>
                  <ExternalLinkIcon className="size-3 opacity-60 ml-auto shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* ─── Massive Architectural Wordmark (Inside Container, Clamped) ─ */}
      <div className="w-full border-t border-border/40 sm:pt-30 sm:pb-30 pt-10 pb-10 bg-muted/10 overflow-hidden select-none footer-watermark-wrapper">
        <Container className="overflow-hidden text-center footer-watermark-wrapper">
          <span
            aria-hidden="true"
            className="footer-watermark block w-full font-heading font-black tracking-tighter text-foreground/[0.04] uppercase select-none cursor-default"
          >
            DRONETV
          </span>
        </Container>
      </div>

      {/* ─── Bottom Copyright Bar (Inside Container) ───────────────── */}
      <div className="w-full border-t border-border/80 bg-background/50 py-4">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs sm:text-[13px] text-muted-foreground">
            <p>© {YEAR} DroneTV (DroneTv.in). All rights reserved. Founded by Dev R.</p>
            <p className="text-xs text-muted-foreground/80">
              Voice of Drone Technology, GIS & AI Technologies • Hyderabad, Telangana, India
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
