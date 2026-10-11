import { LayoutDashboardIcon, LogOutIcon, PlaneTakeoffIcon } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/authSlice"

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logout())
    navigate("/")
  }

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-full border border-border/80 bg-card/85 px-4 sm:px-6 shadow-sm backdrop-blur-xl transition-all">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-heading text-sm sm:text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
            <PlaneTakeoffIcon className="size-4.5 stroke-[2.2]" />
          </span>
          <span className="flex items-center gap-1.5">
            <span>DroneTV</span>
            <span className="text-muted-foreground font-medium">Academy</span>
            <span className="size-1.5 rounded-full bg-primary" />
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/50">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-2xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions & Admin */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {status === "authenticated" && user ? (
            <>
              <Button
                render={<Link to="/admin" />}
                size="sm"
                className="rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 text-xs px-3.5"
              >
                <LayoutDashboardIcon className="size-3.5 mr-1" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => void handleLogout()}
                title="Logout"
                aria-label="Logout"
                className="rounded-full text-muted-foreground hover:text-destructive"
              >
                <LogOutIcon className="size-4" />
              </Button>
            </>
          ) : (
            <Button
              render={<Link to="/admin/login" />}
              size="sm"
              className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs px-4 py-1.5 shadow-xs transition-all active:scale-[0.98]"
            >
              Admin Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
