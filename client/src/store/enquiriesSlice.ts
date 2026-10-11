import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getApiErrorMessage, getFieldErrors } from "@/services/api"
import {
  createEnquiry as createEnquiryRequest,
  deleteEnquiry,
  listEnquiries,
  updateEnquiryStatus,
} from "@/services/enquiryService"
import type {
  CreateEnquiryInput,
  Enquiry,
  EnquiryStatus,
} from "@/types/enquiry"

export type EnquiriesStatus = "idle" | "loading" | "succeeded" | "failed"

export interface EnquiriesState {
  items: Enquiry[]
  listStatus: EnquiriesStatus
  error: string | null
  filter: EnquiryStatus | ""
  selectedId: string | null
}

const initialState: EnquiriesState = {
  items: [],
  listStatus: "idle",
  error: null,
  filter: "",
  selectedId: null,
}

export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetch",
  async (filter: EnquiryStatus | "") =>
    listEnquiries(filter ? { status: filter } : undefined)
)

export const submitEnquiry = createAsyncThunk<
  Enquiry,
  CreateEnquiryInput,
  { rejectValue: { message: string; fieldErrors: Record<string, string> } }
>("enquiries/submit", async (input, { rejectWithValue }) => {
  try {
    return await createEnquiryRequest(input)
  } catch (error) {
    return rejectWithValue({
      message: getApiErrorMessage(error),
      fieldErrors: getFieldErrors(error),
    })
  }
})

export const changeStatus = createAsyncThunk<
  Enquiry,
  { id: string; status: EnquiryStatus },
  { rejectValue: string }
>("enquiries/changeStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    return await updateEnquiryStatus(id, status)
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error))
  }
})

export const removeEnquiry = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("enquiries/remove", async (id, { rejectWithValue }) => {
  try {
    await deleteEnquiry(id)
    return id
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error))
  }
})

const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<EnquiryStatus | "">) {
      state.filter = action.payload
    },
    selectEnquiry(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload
    },
    clearSelected(state) {
      state.selectedId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.listStatus = "loading"
        state.error = null
      })
      .addCase(fetchEnquiries.fulfilled, (state, action: PayloadAction<Enquiry[]>) => {
        state.items = action.payload
        state.listStatus = "succeeded"
        if (state.selectedId && !action.payload.some((item) => item._id === state.selectedId)) {
          state.selectedId = null
        }
      })
      .addCase(fetchEnquiries.rejected, (state) => {
        state.listStatus = "failed"
        state.error = "Could not load enquiries. Please try again."
      })
      .addCase(changeStatus.fulfilled, (state, action: PayloadAction<Enquiry>) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(removeEnquiry.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item._id !== action.payload)
        if (state.selectedId === action.payload) state.selectedId = null
      })
  },
})

export const { setFilter, selectEnquiry, clearSelected } = enquiriesSlice.actions
export default enquiriesSlice.reducer
