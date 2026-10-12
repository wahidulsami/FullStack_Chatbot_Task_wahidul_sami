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

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-card text-foreground overflow-hidden">
      {/* ─── Top Grid: Links & Verified Information (Full Width) ──── */}
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-14">
          {/* Brand Info & Address (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
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

            <p className="text-xs text-muted-foreground leading-relaxed max-w-[48ch]">
              The Voice of Drone Technology, GIS, and AI Technologies in India. Uniting pilots, manufacturers, enterprise buyers, and policymakers under an integrated media and marketplace platform. Founded by Dev R.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPinIcon className="size-4 shrink-0 text-primary mt-0.5" />
                <span>DroneTv 5A/6B, White Waters, Timber Lake Colony, Shaikpet, Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="size-4 shrink-0 text-primary" />
                <a href="mailto:bd@dronetv.in" className="hover:text-foreground transition-colors font-medium">
                  bd@dronetv.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-4 shrink-0 text-primary" />
                <span className="font-mono text-[11px]">+91 8882210038 / +91 9354688923</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
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

          {/* Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <span className="flex items-center gap-1.5">
                  <span>Drone Expo 2025</span>
                  <span className="rounded-xl bg-primary/15 px-1.5 py-0.2 text-[9px] font-semibold text-primary">
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

          {/* Social & Verified Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Verified Channels</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a
                  href="https://youtube.com/@indiadronetv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <VideoIcon className="size-3.5 text-red-500" />
                  <span>YouTube (@indiadronetv)</span>
                  <ExternalLinkIcon className="size-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dronetv.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <SparklesIcon className="size-3.5 text-pink-500" />
                  <span>Instagram (@dronetv.in)</span>
                  <ExternalLinkIcon className="size-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/indiadronetv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <span>X / Twitter (@indiadronetv)</span>
                  <ExternalLinkIcon className="size-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/dronetv.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <span>Facebook (dronetv.in)</span>
                  <ExternalLinkIcon className="size-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Massive Full-Bleed Architectural Wordmark ─────────────── */}
      <div className="w-full border-t border-border/40 py-6 sm:py-12 bg-muted/20 select-none overflow-hidden">
        <div className="w-full text-center px-4">
          <span className="block w-full font-heading text-[17vw] sm:text-[16vw] font-black tracking-tighter leading-none text-foreground/[0.07] dark:text-foreground/[0.05] uppercase transition-colors hover:text-primary/20 cursor-default select-none">
            DRONETV
          </span>
        </div>
      </div>

      {/* ─── Bottom Copyright Bar (Full Width) ────────────────────── */}
      <div className="w-full border-t border-border/80 bg-background/50 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-4 text-xs text-muted-foreground">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {YEAR} DroneTV (DroneTv.in). All rights reserved. Founded by Dev R.</p>
          <p className="text-[11px] text-muted-foreground/80">
            Voice of Drone Technology, GIS & AI Technologies • Hyderabad, Telangana, India
          </p>
        </div>
      </div>
    </footer>
  )
}
