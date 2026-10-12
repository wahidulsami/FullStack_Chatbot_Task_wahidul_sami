import { z } from "zod"
import { ENQUIRY_STATUSES, USER_TYPES } from "../types/enquiry"

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Invalid email address"))

export const MESSAGE_MAX_WORDS = 2000

export const countWords = (value: string): number => {
  const trimmed = value.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

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
    .max(40000, "Message is too long")
    .refine(
      (value) => countWords(value) <= MESSAGE_MAX_WORDS,
      `Message is too long (max ${MESSAGE_MAX_WORDS} words)`,
    ),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const statusSchema = z.enum(ENQUIRY_STATUSES)
