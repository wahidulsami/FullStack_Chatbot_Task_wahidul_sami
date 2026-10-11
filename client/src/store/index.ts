import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/authSlice"
import enquiriesReducer from "@/store/enquiriesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    enquiries: enquiriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
