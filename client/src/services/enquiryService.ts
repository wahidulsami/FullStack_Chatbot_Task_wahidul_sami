import { api, ApiError, toApiError } from "./api"
import type {
  CreateEnquiryInput,
  Enquiry,
  EnquiryListParams,
  EnquiryListResponse,
  EnquiryStatus,
} from "../types/enquiry"

function unwrapEnquiry(data: { enquiry?: Enquiry } | undefined): Enquiry {
  if (!data?.enquiry?._id) {
    throw new ApiError("The server returned an unexpected response. Please try again.")
  }
  return data.enquiry
}

export async function createEnquiry(input: CreateEnquiryInput): Promise<Enquiry> {
  try {
    const { data } = await api.post<{ enquiry: Enquiry }>("/enquiries", input)
    return unwrapEnquiry(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export async function listEnquiries(
  params?: EnquiryListParams
): Promise<EnquiryListResponse> {
  try {
    const cleanParams: Record<string, string | number> = {}
    if (params) {
      if (params.page !== undefined) cleanParams.page = params.page
      if (params.limit !== undefined) cleanParams.limit = params.limit
      if (params.status) cleanParams.status = params.status
      if (params.userType) cleanParams.userType = params.userType
      if (params.search) cleanParams.search = params.search.trim()
      if (params.sortBy) cleanParams.sortBy = params.sortBy
      if (params.sortOrder) cleanParams.sortOrder = params.sortOrder
      if (params.cursor) cleanParams.cursor = params.cursor
      if (params.strategy) cleanParams.strategy = params.strategy
    }

    const { data } = await api.get<EnquiryListResponse>("/enquiries", { params: cleanParams })

    if (!Array.isArray(data?.enquiries)) {
      throw new ApiError("The server returned an unexpected response. Please try again.")
    }

    return {
      enquiries: data.enquiries,
      count: data.count ?? data.enquiries.length,
      pagination: data.pagination ?? {
        total: data.enquiries.length,
        page: params?.page ?? 1,
        limit: params?.limit ?? 20,
        totalPages: Math.max(1, Math.ceil(data.enquiries.length / (params?.limit ?? 20))),
        hasNextPage: false,
        hasPrevPage: false,
      },
      stats: data.stats,
    }
  } catch (error) {
    throw toApiError(error)
  }
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry> {
  try {
    const { data } = await api.patch<{ enquiry: Enquiry }>(`/enquiries/${id}/status`, { status })
    return unwrapEnquiry(data)
  } catch (error) {
    throw toApiError(error)
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  try {
    await api.delete(`/enquiries/${id}`)
  } catch (error) {
    throw toApiError(error)
  }
}
