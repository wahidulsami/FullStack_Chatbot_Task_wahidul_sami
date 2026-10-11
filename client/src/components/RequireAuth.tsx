import type { ReactNode } from "react"
import { LoaderCircleIcon } from "lucide-react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const status = useAppSelector((state) => state.auth.status)
  const location = useLocation()

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  if (status === "guest") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
