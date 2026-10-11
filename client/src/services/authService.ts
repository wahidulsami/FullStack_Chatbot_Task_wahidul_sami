import { api, getApiErrorStatus, refreshSession, setAccessToken, toApiError } from "./api"
import type { AuthUser, LoginResponse, UserResponse } from "../types/auth"

export type RestoreOutcome =
  | { outcome: "authenticated"; user: AuthUser }
  | { outcome: "guest" }
  | { outcome: "unreachable" }

const TRANSIENT_RETRY_DELAYS_MS = [1_000, 3_000]

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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

export async function restoreSession(): Promise<RestoreOutcome> {
  for (let attempt = 0; ; attempt++) {
    const refresh = await refreshSession()

    if (refresh.ok) {
      try {
        const user = await fetchCurrentUser()
        return { outcome: "authenticated", user }
      } catch (error) {
        // Only a real rejection of our credentials ends the session.
        if (getApiErrorStatus(error) === 401) {
          setAccessToken(null)
          return { outcome: "guest" }
        }
        // 429/5xx/network on /auth/me → retry below
      }
    } else if (refresh.reason === "unauthorized") {
      return { outcome: "guest" }
    }

    if (attempt >= TRANSIENT_RETRY_DELAYS_MS.length) {
      return { outcome: "unreachable" }
    }
    await wait(TRANSIENT_RETRY_DELAYS_MS[attempt])
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
