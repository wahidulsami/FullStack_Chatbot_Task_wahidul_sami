import { api, refreshSession, setAccessToken, toApiError } from "./api"
import type { AuthUser, LoginResponse, UserResponse } from "../types/auth"

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", { email, password })

    if (!data?.accessToken || !data?.user) {
      setAccessToken(null)
      throw new Error("The server returned an unexpected response. Please try again.")
    }

    setAccessToken(data.accessToken)
    return data
  } catch (error) {
    setAccessToken(null)
    throw toApiError(error)
  }
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  try {
    const { data } = await api.get<UserResponse>("/auth/me")

    if (!data?.user) {
      throw new Error("The server returned an unexpected response. Please try again.")
    }

    return data.user
  } catch (error) {
    throw toApiError(error)
  }
}

export async function restoreSession(): Promise<AuthUser | null> {
  try {
    const token = await refreshSession()
    if (!token) return null
    return await fetchCurrentUser()
  } catch {
    setAccessToken(null)
    return null
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout")
  } catch {
    // Network/server failures must not block the local sign-out.
  } finally {
    setAccessToken(null)
  }
}
