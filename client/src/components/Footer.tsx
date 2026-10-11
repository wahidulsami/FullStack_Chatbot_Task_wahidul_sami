import { Link } from "react-router-dom"

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground">
        <p>© {YEAR} ChatBot Academy. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link to="/services" className="hover:text-foreground">
            Services
          </Link>
          <Link to="/courses" className="hover:text-foreground">
            Courses
          </Link>
          <Link to="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
