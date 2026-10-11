import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getApiErrorMessage } from "@/services/api"
import * as authService from "@/services/authService"
import type { AuthUser, LoginResponse } from "@/types/auth"

export type AuthStatus = "loading" | "authenticated" | "guest" | "error"

export interface AuthState {
  user: AuthUser | null
  status: AuthStatus
  initialized: boolean
}

const initialState: AuthState = {
  user: null,
  status: "loading",
  initialized: false,
}

export const restoreSession = createAsyncThunk("auth/restore", async (): Promise<authService.RestoreOutcome> => {
  try {
    return await authService.restoreSession()
  } catch {
    // An unexpected client error is not proof the session ended.
    return { outcome: "unreachable" }
  }
})

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await authService.login(email, password)
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error))
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionExpired(state) {
      state.user = null
      state.status = "guest"
      state.initialized = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.status = "loading"
      })
      .addCase(restoreSession.fulfilled, (state, action: PayloadAction<authService.RestoreOutcome>) => {
        const { outcome } = action.payload

        if (outcome === "authenticated") {
          state.user = action.payload.user
          state.status = "authenticated"
        } else if (outcome === "guest") {
          state.user = null
          state.status = "guest"
        } else {
          // transient failure (429/5xx/network): session kept, show retry UI
          state.status = "error"
        }
        state.initialized = true
      })
      .addCase(restoreSession.rejected, (state) => {
        state.status = "error"
        state.initialized = true
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.user = action.payload.user
        state.status = "authenticated"
        state.initialized = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.status = "guest"
      })
      .addCase(logout.rejected, (state) => {
        state.user = null
        state.status = "guest"
      })
  },
})

export const { sessionExpired } = authSlice.actions
export default authSlice.reducer
