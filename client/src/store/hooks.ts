import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const selectAuth = (state: RootState) => state.auth
export const selectEnquiries = (state: RootState) => state.enquiries
export const selectSelectedEnquiry = (state: RootState) =>
  state.enquiries.items.find((item) => item._id === state.enquiries.selectedId) ?? null
