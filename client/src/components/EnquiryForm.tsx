import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2Icon, SendIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { cn } from "cn"
import { USER_TYPES, type UserType } from "@/types/enquiry"
import { useAppDispatch } from "@/store/hooks"
import { submitEnquiry } from "@/store/enquiriesSlice"
import { enquirySchema, type EnquiryFormValues } from "@/validation/schemas"

const MESSAGE_MAX = 5000

const defaultValues: EnquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  userType: "Student",
  interest: "",
  message: "",
}

export default function EnquiryForm() {
  const dispatch = useAppDispatch()
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues,
  })

  const userType = watch("userType")
  const messageLength = watch("message").length

  const onSubmit = async (values: EnquiryFormValues) => {
    const result = await dispatch(submitEnquiry(values))

    if (submitEnquiry.fulfilled.match(result)) {
      setSent(true)
      reset(defaultValues)
      toast.add({
        type: "success",
        title: "Enquiry sent",
        description: "We will get back to you shortly.",
      })
      return
    }

    const payload = result.payload
    if (payload && Object.keys(payload.fieldErrors).length > 0) {
      Object.entries(payload.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof EnquiryFormValues, { type: "server", message })
      })
      return
    }

    const message = payload?.message ?? "Something went wrong. Please try again."
    setError("root", { type: "server", message })
    toast.add({ type: "error", title: "Could not send enquiry", description: message })
  }

  if (sent) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2Icon className="size-10 text-primary" />
          <CardTitle className="font-heading">Thank you for your enquiry!</CardTitle>
          <CardDescription>
            We have received your message and will get back to you shortly.
          </CardDescription>
          <Button variant="outline" className="mt-2" onClick={() => setSent(false)}>
            Send another message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Send us a message</CardTitle>
        <CardDescription>Fill in the form below and we will contact you.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {errors.root?.message && (
            <Alert variant="destructive">
              <AlertTitle>Submission failed</AlertTitle>
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                placeholder="Jane Doe"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={!!errors.phone}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="+880 1712 345678"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
              <FieldError errors={[errors.phone]} />
            </Field>

            <Field data-invalid={!!errors.userType}>
              <FieldLabel>I am a</FieldLabel>
              <Select
                value={userType}
                onValueChange={(value) =>
                  value && setValue("userType", value as UserType, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full" aria-invalid={!!errors.userType}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {USER_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.userType]} />
            </Field>

            <Field className="sm:col-span-2" data-invalid={!!errors.interest}>
              <FieldLabel htmlFor="interest">Service or course of interest</FieldLabel>
              <Input
                id="interest"
                placeholder="e.g. Full Stack Web Development"
                aria-invalid={!!errors.interest}
                {...register("interest")}
              />
              <FieldError errors={[errors.interest]} />
            </Field>

            <Field className="sm:col-span-2" data-invalid={!!errors.message}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us what you are looking for..."
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              <p
                className={cn(
                  "text-right text-xs text-muted-foreground",
                  messageLength > MESSAGE_MAX && "text-destructive"
                )}
              >
                {messageLength} / {MESSAGE_MAX}
              </p>
              <FieldError errors={[errors.message]} />
            </Field>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            <SendIcon />
            {isSubmitting ? "Sending..." : "Send enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
