import { useState } from "react"
import {
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  PlaneTakeoffIcon,
  XIcon,
} from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await dispatch(logout())
    setMobileMenuOpen(false)
    navigate("/")
  }

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-xl border border-border/80 bg-card/85 px-4 sm:px-6 shadow-sm backdrop-blur-xl transition-all">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-2.5 font-heading text-sm sm:text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
            <PlaneTakeoffIcon className="size-4.5 stroke-[2.2]" />
          </span>
          <span className="flex items-center gap-1.5">
            <span>DroneTV</span>
            <span className="text-muted-foreground font-medium hidden xs:inline">Academy</span>
            <span className="size-1.5 rounded-xl bg-primary" />
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/50">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
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

        {/* Desktop Actions & Admin */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {status === "authenticated" && user ? (
            <>
              <Button
                render={<Link to="/admin" />}
                size="sm"
                className="rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 text-xs px-3.5"
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
                className="rounded-xl text-muted-foreground hover:text-destructive"
              >
                <LogOutIcon className="size-4" />
              </Button>
            </>
          ) : (
            <Button
              render={<Link to="/admin/login" />}
              size="sm"
              className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 text-xs px-4 py-1.5 shadow-xs transition-all active:scale-[0.98]"
            >
              Admin Login
            </Button>
          )}
        </div>

        {/* Mobile & Tablet Toggle Button */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="rounded-xl text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl rounded-xl p-1.5 bg-muted/40 border border-border shadow-2xl backdrop-blur-xl animate-bubble-in">
          <div className="rounded-[calc(1.225rem-0.375rem)] bg-card border border-border/40 p-4 space-y-3">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/15 text-primary font-bold"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </NavLink>
              ))}
            </nav>

            <div className="pt-2 border-t border-border/50 flex items-center justify-between">
              {status === "authenticated" && user ? (
                <div className="flex items-center justify-between w-full gap-2">
                  <Button
                    render={<Link to="/admin" />}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-xl bg-primary text-primary-foreground font-semibold text-xs"
                  >
                    <LayoutDashboardIcon className="size-3.5 mr-1" />
                    Admin Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleLogout()}
                    className="rounded-xl text-xs"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  render={<Link to="/admin/login" />}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl bg-primary text-primary-foreground font-semibold text-xs py-2 shadow-xs"
                >
                  Admin Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
