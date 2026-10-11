import { LayoutDashboardIcon, LogOutIcon } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/authSlice"

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
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
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          ChatBot Academy
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {status === "authenticated" && user ? (
            <>
              <Button render={<Link to="/admin" />} size="sm">
                <LayoutDashboardIcon />
                Dashboard
              </Button>
              <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
              <Button variant="outline" size="sm" onClick={() => void handleLogout()}>
                <LogOutIcon />
                Logout
              </Button>
            </>
          ) : (
            <Button render={<Link to="/admin/login" />} size="sm">
              Admin Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
