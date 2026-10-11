import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon } from "lucide-react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import ThemeToggle from "@/components/ThemeToggle"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            render={<Link to="/" />}
            variant="link"
            size="sm"
            className="-ml-2.5 w-fit px-0 text-muted-foreground"
          >
            <ArrowLeftIcon />
            Back to site
          </Button>
          <CardTitle className="font-heading text-2xl">Admin login</CardTitle>
          <CardDescription>Sign in to manage enquiries.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {errors.root?.message && (
              <Alert variant="destructive">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="admin@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
