import { api, ApiError, toApiError } from "./api"
import type {
  CreateEnquiryInput,
  Enquiry,
  EnquiryListResponse,
  EnquiryStatus,
  UserType,
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

export async function listEnquiries(params?: {
  status?: EnquiryStatus
  userType?: UserType
}): Promise<Enquiry[]> {
  try {
    const { data } = await api.get<EnquiryListResponse>("/enquiries", { params })

    if (!Array.isArray(data?.enquiries)) {
      throw new ApiError("The server returned an unexpected response. Please try again.")
    }

    return data.enquiries
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
