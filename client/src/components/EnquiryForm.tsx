import { useId, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRightIcon, CheckCircle2Icon, LoaderCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
import {
  countWords,
  enquirySchema,
  MESSAGE_MAX_WORDS,
  type EnquiryFormValues,
} from "@/validation/schemas"

type EnquiryFormProps = {
  compact?: boolean
  isExpanded?: boolean
  defaultUserType?: UserType
  onSuccess?: () => void
}

const makeDefaultValues = (userType: UserType = "Student"): EnquiryFormValues => ({
  name: "",
  email: "",
  phone: "",
  userType,
  interest: "",
  message: "",
})

export default function EnquiryForm({
  compact = false,
  isExpanded = false,
  defaultUserType,
  onSuccess,
}: EnquiryFormProps) {
  const dispatch = useAppDispatch()
  const [sent, setSent] = useState(false)
  const idPrefix = useId()

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
    defaultValues: makeDefaultValues(defaultUserType),
  })

  const fieldId = (field: string) => `${idPrefix}${field}`

  const userType = watch("userType")
  const messageValue = watch("message")
  const messageWords = countWords(messageValue)
  const messageRegister = register("message")

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (countWords(value) > MESSAGE_MAX_WORDS) {
      event.target.value = value
        .trim()
        .split(/\s+/)
        .slice(0, MESSAGE_MAX_WORDS)
        .join(" ")
    }
    messageRegister.onChange(event)
  }

  const onSubmit = async (values: EnquiryFormValues) => {
    const result = await dispatch(submitEnquiry(values))

    if (submitEnquiry.fulfilled.match(result)) {
      reset(makeDefaultValues(defaultUserType))
      toast.add({
        type: "success",
        title: "Enquiry sent",
        description: "We will get back to you shortly.",
      })
      if (onSuccess) {
        onSuccess()
        return
      }
      setSent(true)
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
      <div className={cn(!compact && "rounded-xl p-2 bg-muted/40 border border-border shadow-xl")}>
        <div className={cn("flex flex-col items-center gap-3 py-10 text-center", !compact && "rounded-xl bg-card border border-border/40 p-8 shadow-xs")}>
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <CheckCircle2Icon className="size-8" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground">Thank you for your enquiry!</h3>
          <p className="text-xs text-muted-foreground max-w-[40ch] leading-relaxed">
            We have received your message and our admissions coordinator will reach out within 24 hours.
          </p>
          <Button
            variant="outline"
            className="mt-3 rounded-xl text-xs"
            onClick={() => setSent(false)}
          >
            Submit Another Message
          </Button>
        </div>
      </div>
    )
  }

  const formBody = (
    <div className={cn("space-y-6", compact && "space-y-3")}>
      {!compact && (
        <div className="space-y-1 border-b border-border/50 pb-4">
          <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Direct Enquiry Form
          </h2>
          <p className="text-xs text-muted-foreground">
            Complete the fields below to connect with our flight training and enterprise team.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={cn("space-y-4", compact && "space-y-3")}
      >
        {errors.root?.message && (
          <Alert variant="destructive" className="rounded-xl">
            <AlertTitle>Submission failed</AlertTitle>
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}

        {/* Short fields layout: two columns in expanded mode or non-compact view */}
        <div
          className={cn(
            isExpanded || !compact
              ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              : "grid grid-cols-1 gap-3"
          )}
        >
          <Field data-invalid={!!errors.name} className="space-y-1">
            <FieldLabel htmlFor={fieldId("name")} className="text-xs font-semibold text-foreground">
              Full Name
            </FieldLabel>
            <Input
              id={fieldId("name")}
              placeholder="e.g. Alex Vance"
              aria-invalid={!!errors.name}
              className="h-11 min-h-[44px] w-full rounded-xl border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.email} className="space-y-1">
            <FieldLabel htmlFor={fieldId("email")} className="text-xs font-semibold text-foreground">
              Email Address
            </FieldLabel>
            <Input
              id={fieldId("email")}
              type="email"
              placeholder="alex@example.com"
              aria-invalid={!!errors.email}
              className="h-11 min-h-[44px] w-full rounded-xl border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.phone} className="space-y-1">
            <FieldLabel htmlFor={fieldId("phone")} className="text-xs font-semibold text-foreground">
              Phone Number
            </FieldLabel>
            <Input
              id={fieldId("phone")}
              type="tel"
              placeholder="+91 98765 43210"
              aria-invalid={!!errors.phone}
              className="h-11 min-h-[44px] w-full rounded-xl border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              {...register("phone")}
            />
            <FieldError errors={[errors.phone]} />
          </Field>

          <Field data-invalid={!!errors.userType} className="space-y-1">
            <FieldLabel className="text-xs font-semibold text-foreground">I am a</FieldLabel>
            <Select
              value={userType}
              onValueChange={(value) =>
                value && setValue("userType", value as UserType, { shouldValidate: true })
              }
            >
              <SelectTrigger
                className="h-11 min-h-[44px] w-full rounded-xl border-border bg-background px-3 text-sm"
                aria-invalid={!!errors.userType}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {USER_TYPES.map((type) => (
                  <SelectItem key={type} value={type} className="text-xs">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[errors.userType]} />
          </Field>

          <Field className={cn((isExpanded || !compact) && "sm:col-span-2", "space-y-1")} data-invalid={!!errors.interest}>
            <FieldLabel htmlFor={fieldId("interest")} className="text-xs font-semibold text-foreground">
              Topic or Service of Interest
            </FieldLabel>
            <Input
              id={fieldId("interest")}
              placeholder="e.g. Drone Expo Media, Drone Doctor Support, RPTO Pilot Training, or GIS Mapping"
              aria-invalid={!!errors.interest}
              className="h-11 min-h-[44px] w-full rounded-xl border-border bg-background px-3 text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              {...register("interest")}
            />
            <FieldError errors={[errors.interest]} />
          </Field>

          <Field className={cn((isExpanded || !compact) && "sm:col-span-2", "space-y-1")} data-invalid={!!errors.message}>
            <FieldLabel htmlFor={fieldId("message")} className="text-xs font-semibold text-foreground">
              Message / Inquiries
            </FieldLabel>
            <Textarea
              id={fieldId("message")}
              rows={compact ? 3 : 5}
              placeholder="Tell us what you are looking for..."
              aria-invalid={!!errors.message}
              className="w-full min-h-28 sm:min-h-0 sm:h-30 rounded-xl border-border bg-background p-3 text-xs sm:text-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 leading-relaxed"
              {...messageRegister}
              onChange={handleMessageChange}
            />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>Min 5 characters</span>
              <span
                className={cn(
                  messageWords >= MESSAGE_MAX_WORDS && "text-destructive font-bold",
                )}
              >
                {messageWords} / {MESSAGE_MAX_WORDS} words
              </span>
            </div>
            <FieldError errors={[errors.message]} />
          </Field>
        </div>

        {/* Vibrant Yellow CTA Button */}
        <div className="pt-2">
          <Button


            type="submit"
            disabled={isSubmitting}
            className={cn(
              "group w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm transition-all duration-300 active:scale-[0.98] inline-flex items-center justify-center gap-2 h-11 text-xs sm:text-sm",
              !compact && "sm:w-auto px-6 py-3"
            )}
          >
            {isSubmitting ? (
              <>
                <LoaderCircleIcon className="size-4 animate-spin" />
                <span>Sending Enquiry...</span>
              </>
            ) : (
              <>
                <span>Send Enquiry Message</span>
                <span className="flex size-6 items-center justify-center rounded-xl bg-primary-foreground/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon className="size-3 stroke-[2.5]" />
                </span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )

  if (compact) {
    return <div className="w-full p-1 sm:p-2">{formBody}</div>
  }

  return (
    <div className="rounded-xl p-2 bg-muted/40 border border-border shadow-xl ring-1 ring-border/20 backdrop-blur-md">
      <div className="rounded-xl bg-card border border-border/40 p-6 sm:p-8 shadow-xs">
        {formBody}
      </div>
    </div>
  )
}
