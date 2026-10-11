import { z } from "zod"
import { ENQUIRY_STATUSES, USER_TYPES } from "../types/enquiry"

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Invalid email address"))

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
  userType: z.enum(USER_TYPES),
  interest: z
    .string()
    .trim()
    .min(1, "Interest is required")
    .max(150, "Interest is too long"),
  message: z
    .string()
    .trim()
    .min(5, "Message is too short")
    .max(1000, "Message is too long"),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const statusSchema = z.enum(ENQUIRY_STATUSES)
