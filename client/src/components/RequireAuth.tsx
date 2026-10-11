import type { ReactNode } from "react"
import { LoaderCircleIcon, RefreshCwIcon, TriangleAlertIcon } from "lucide-react"
import { Navigate, useLocation } from "react-router-dom"
import { restoreSession } from "@/store/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const status = useAppSelector((state) => state.auth.status)
  const dispatch = useAppDispatch()
  const location = useLocation()

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <Alert variant="destructive" className="max-w-md">
          <TriangleAlertIcon />
          <AlertTitle>Can&apos;t reach the server</AlertTitle>
          <AlertDescription>
            We couldn&apos;t restore your session because the server is unreachable or rate-limited.
            Your session has not ended — try again in a moment.
          </AlertDescription>
        </Alert>
        <Button onClick={() => void dispatch(restoreSession())}>
          <RefreshCwIcon />
          Try again
        </Button>
      </div>
    )
  }

  if (status === "guest") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
