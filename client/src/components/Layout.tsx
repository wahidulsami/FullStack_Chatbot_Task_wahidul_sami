import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip bg-background text-foreground min-w-0">
      <Navbar />
      <main className="flex-1 w-full max-w-full min-w-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
