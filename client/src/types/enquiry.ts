export const USER_TYPES = ["Student", "Customer", "Other"] as const
export type UserType = (typeof USER_TYPES)[number]

export const ENQUIRY_STATUSES = ["New", "Contacted", "In Progress", "Closed"] as const
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number]

export interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  userType: UserType
  interest: string
  message: string
  status: EnquiryStatus
  createdAt: string
  updatedAt: string
}

export interface EnquiryListResponse {
  enquiries: Enquiry[]
  count: number
}

export type CreateEnquiryInput = Omit<Enquiry, "_id" | "status" | "createdAt" | "updatedAt">
