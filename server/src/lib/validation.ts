import { z } from "zod"
import { STATUSES, USER_TYPES } from "../models/Enquiry"

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Invalid email address"))

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const createEnquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
  userType: z.enum(USER_TYPES),
  interest: z.string().trim().min(1, "Interest is required").max(150, "Interest is too long"),
  message: z
    .string()
    .trim()
    .min(5, "Message is too short")
    .max(2000, "Message is too long (max 2000 characters)"),
})

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(STATUSES),
})

export type UpdateEnquiryStatusInput = z.infer<typeof updateEnquiryStatusSchema>

export const enquiryListQuerySchema = z.object({
  status: z.enum(STATUSES).optional(),
  userType: z.enum(USER_TYPES).optional(),
})

export type EnquiryListQuery = z.infer<typeof enquiryListQuerySchema>
