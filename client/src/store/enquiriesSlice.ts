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
  EnquiryListParams,
  EnquiryListResponse,
  EnquiryStatus,
  PaginationMeta,
  EnquiriesStats,
  UserType,
} from "@/types/enquiry"

export type EnquiriesStatus = "idle" | "loading" | "succeeded" | "failed"

export interface EnquiriesState {
  items: Enquiry[]
  listStatus: EnquiriesStatus
  error: string | null
  filter: EnquiryStatus | ""
  userTypeFilter: UserType | ""
  search: string
  page: number
  limit: number
  sortBy: "createdAt" | "name" | "status" | "userType"
  sortOrder: "asc" | "desc"
  pagination: PaginationMeta
  stats: EnquiriesStats
  selectedId: string | null
}

const defaultPagination: PaginationMeta = {
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextCursor: null,
}

const defaultStats: EnquiriesStats = {
  total: 0,
  new: 0,
  inProgress: 0,
  closed: 0,
}

const initialState: EnquiriesState = {
  items: [],
  listStatus: "idle",
  error: null,
  filter: "",
  userTypeFilter: "",
  search: "",
  page: 1,
  limit: 20,
  sortBy: "createdAt",
  sortOrder: "desc",
  pagination: defaultPagination,
  stats: defaultStats,
  selectedId: null,
}

export const fetchEnquiries = createAsyncThunk<
  EnquiryListResponse,
  EnquiryListParams | EnquiryStatus | "" | undefined,
  { state: { enquiries: EnquiriesState } }
>("enquiries/fetch", async (arg, { getState }) => {
  const state = getState().enquiries
  let customParams: EnquiryListParams | undefined
  if (typeof arg === "string") {
    customParams = { status: arg, page: 1 }
  } else {
    customParams = arg
  }

  const params: EnquiryListParams = {
    page: customParams?.page ?? state.page,
    limit: customParams?.limit ?? state.limit,
    status: customParams?.status !== undefined ? customParams.status : state.filter,
    userType: customParams?.userType !== undefined ? customParams.userType : state.userTypeFilter,
    search: customParams?.search !== undefined ? customParams.search : state.search,
    sortBy: customParams?.sortBy ?? state.sortBy,
    sortOrder: customParams?.sortOrder ?? state.sortOrder,
    cursor: customParams?.cursor,
    strategy: customParams?.strategy,
  }
  return await listEnquiries(params)
})

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
      state.page = 1
    },
    setUserTypeFilter(state, action: PayloadAction<UserType | "">) {
      state.userTypeFilter = action.payload
      state.page = 1
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
      state.page = 1
    },
    setSorting(
      state,
      action: PayloadAction<{ sortBy: "createdAt" | "name" | "status" | "userType"; sortOrder: "asc" | "desc" }>
    ) {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
      state.page = 1
    },
    setParams(state, action: PayloadAction<Partial<EnquiryListParams>>) {
      if (action.payload.status !== undefined) state.filter = action.payload.status
      if (action.payload.userType !== undefined) state.userTypeFilter = action.payload.userType
      if (action.payload.search !== undefined) state.search = action.payload.search
      if (action.payload.page !== undefined) state.page = action.payload.page
      if (action.payload.limit !== undefined) state.limit = action.payload.limit
      if (action.payload.sortBy !== undefined) state.sortBy = action.payload.sortBy
      if (action.payload.sortOrder !== undefined) state.sortOrder = action.payload.sortOrder
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
      .addCase(fetchEnquiries.fulfilled, (state, action: PayloadAction<EnquiryListResponse>) => {
        state.items = action.payload.enquiries
        state.pagination = action.payload.pagination
        if (action.payload.stats) {
          state.stats = action.payload.stats
        }
        state.page = action.payload.pagination.page
        state.limit = action.payload.pagination.limit
        state.listStatus = "succeeded"
        if (state.selectedId && !action.payload.enquiries.some((item) => item._id === state.selectedId)) {
          state.selectedId = null
        }
      })
      .addCase(fetchEnquiries.rejected, (state) => {
        state.listStatus = "failed"
        state.error = "Could not load enquiries. Please try again."
      })
      .addCase(changeStatus.fulfilled, (state, action: PayloadAction<Enquiry>) => {
        const prev = state.items.find((item) => item._id === action.payload._id)
        if (prev && prev.status !== action.payload.status) {
          const oldStatus = prev.status
          const newStatus = action.payload.status

          if (oldStatus === "New") state.stats.new = Math.max(0, state.stats.new - 1)
          else if (oldStatus === "Closed") state.stats.closed = Math.max(0, state.stats.closed - 1)
          else state.stats.inProgress = Math.max(0, state.stats.inProgress - 1)

          if (newStatus === "New") state.stats.new++
          else if (newStatus === "Closed") state.stats.closed++
          else state.stats.inProgress++
        }
        const index = state.items.findIndex((item) => item._id === action.payload._id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(removeEnquiry.fulfilled, (state, action: PayloadAction<string>) => {
        const deleted = state.items.find((item) => item._id === action.payload)
        if (deleted) {
          state.pagination.total = Math.max(0, state.pagination.total - 1)
          state.stats.total = Math.max(0, state.stats.total - 1)
          if (deleted.status === "New") state.stats.new = Math.max(0, state.stats.new - 1)
          else if (deleted.status === "Closed") state.stats.closed = Math.max(0, state.stats.closed - 1)
          else state.stats.inProgress = Math.max(0, state.stats.inProgress - 1)
        }
        state.items = state.items.filter((item) => item._id !== action.payload)
        if (state.selectedId === action.payload) state.selectedId = null
      })
  },
})

export const {
  setFilter,
  setUserTypeFilter,
  setSearch,
  setPage,
  setLimit,
  setSorting,
  setParams,
  selectEnquiry,
  clearSelected,
} = enquiriesSlice.actions

export default enquiriesSlice.reducer
