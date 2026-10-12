import { z } from "zod"
import { ENQUIRY_STATUSES, USER_TYPES } from "../types/enquiry"

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .email("Invalid email address")
  .max(100, "Email is too long")

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
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number (7 to 15 digits)")
    .max(20, "Phone number is too long"),
  userType: z.enum(USER_TYPES),
  interest: z
    .string()
    .trim()
    .min(1, "Interest is required")
    .max(150, "Interest is too long"),
  message: z
    .string()
    .trim()
    .min(5, "Message is too short (min 5 characters)")
    .max(2000, "Message cannot exceed 2000 characters"),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const statusSchema = z.enum(ENQUIRY_STATUSES)

export const enquiryListQuerySchema = z.object({
  status: z.enum(ENQUIRY_STATUSES).optional(),
  userType: z.enum(USER_TYPES).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
  search: z.string().trim().max(100).optional(),
  sortBy: z.enum(["createdAt", "name", "status", "userType"]).default("createdAt").optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
  cursor: z.string().optional(),
  strategy: z.enum(["offset", "cursor"]).default("offset").optional(),
})

export type EnquiryListQuery = z.infer<typeof enquiryListQuerySchema>
