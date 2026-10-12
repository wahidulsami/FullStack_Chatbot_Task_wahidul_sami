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

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextCursor?: string | null
}

export interface EnquiriesStats {
  total: number
  new: number
  inProgress: number
  closed: number
}

export interface EnquiryListParams {
  page?: number
  limit?: number
  status?: EnquiryStatus | ""
  userType?: UserType | ""
  search?: string
  sortBy?: "createdAt" | "name" | "status" | "userType"
  sortOrder?: "asc" | "desc"
  cursor?: string
  strategy?: "offset" | "cursor"
}

export interface EnquiryListResponse {
  enquiries: Enquiry[]
  count: number
  pagination: PaginationMeta
  stats?: EnquiriesStats
}

export type CreateEnquiryInput = Omit<Enquiry, "_id" | "status" | "createdAt" | "updatedAt">
