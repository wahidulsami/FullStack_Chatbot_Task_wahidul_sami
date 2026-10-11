import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, ArrowRightIcon, LoaderCircleIcon, ShieldCheckIcon } from "lucide-react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login } from "@/store/authSlice"
import { loginSchema, type LoginFormValues } from "@/validation/schemas"

export default function AdminLogin() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  if (status === "authenticated") {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (values: LoginFormValues) => {
    const result = await dispatch(login(values))

    if (login.fulfilled.match(result)) {
      toast.add({
        type: "success",
        title: "Welcome back",
        description: `Signed in as ${result.payload.user.email}`,
      })
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(from && from !== "/admin/login" ? from : "/admin", { replace: true })
      return
    }

    setError("root", { type: "server", message: result.payload ?? "Login failed" })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6">
        <Button
          render={<Link to="/" />}
          variant="outline"
          size="sm"
          className="rounded-full border-border/80 bg-card/80 backdrop-blur-md px-4 text-xs font-medium text-foreground hover:bg-muted shadow-2xs"
        >
          <ArrowLeftIcon className="mr-1.5 size-3.5" />
          Back to site
        </Button>
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Double-Bezel Concentric Card Architecture */}
      <div className="w-full max-w-md rounded-[2.4rem] p-2 bg-muted/40 border border-border shadow-2xl ring-1 ring-border/20 backdrop-blur-xl animate-bubble-in">
        <div className="rounded-[calc(2.4rem-0.5rem)] bg-card border border-border/40 p-8 sm:p-10 shadow-xs space-y-6">
          {/* Header & Brand Icon */}
          <div className="space-y-3 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-xs">
              <ShieldCheckIcon className="size-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                Admin Control Portal
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                DroneTV Portal
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sign in to manage admissions, enquiries, and flight academy operations.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {errors.root?.message && (
              <Alert variant="destructive" className="rounded-xl">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            <Field data-invalid={!!errors.email} className="space-y-1.5">
              <FieldLabel htmlFor="email" className="text-xs font-semibold text-foreground">
                Email Address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="admin@example.com"
                aria-invalid={!!errors.email}
                className="h-10 rounded-xl border-border bg-background px-3.5 text-sm shadow-2xs transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={!!errors.password} className="space-y-1.5">
              <FieldLabel htmlFor="password" className="text-xs font-semibold text-foreground">
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className="h-10 rounded-xl border-border bg-background px-3.5 text-sm shadow-2xs transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            {/* Vibrant Yellow CTA Button with Button-in-Button Icon */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="group w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 h-11 text-sm shadow-sm transition-all duration-300 active:scale-[0.98] inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="size-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon className="size-3 stroke-[2.5]" />
                  </span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
