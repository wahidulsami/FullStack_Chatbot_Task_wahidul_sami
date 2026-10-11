import axios, { type InternalAxiosRequestConfig } from "axios"
import type { LoginResponse } from "../types/auth"

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean }

const baseURL = import.meta.env.VITE_API_URL || "/api"
const TIMEOUT_MS = 15_000

let accessToken: string | null = null
let refreshPromise: Promise<string | null> | null = null
let sessionExpiredHandler: (() => void) | null = null

export function setAccessToken(token: string | null): void {
  accessToken = token
}

export function getAccessToken(): string | null {
  return accessToken
}

export function onSessionExpired(handler: () => void): void {
  sessionExpiredHandler = handler
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: TIMEOUT_MS,
})

const authClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: TIMEOUT_MS,
})

interface ApiErrorBody {
  message?: string
  errors?: { field?: string; message?: string }[]
}

export class ApiError extends Error {
  readonly status?: number
  readonly fieldErrors: Record<string, string>

  constructor(message: string, status?: number, fieldErrors: Record<string, string> = {}) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

function statusMessage(status: number): string {
  switch (status) {
    case 400:
      return "The request was invalid. Please check your input."
    case 401:
      return "Your session has expired. Please sign in again."
    case 403:
      return "You do not have permission to do that."
    case 404:
      return "We could not find what you were looking for."
    case 409:
      return "This conflicts with the current state. Please refresh and retry."
    case 413:
      return "That request was too large."
    case 422:
      return "Some of the details you sent could not be processed."
    case 429:
      return "Too many requests. Please wait a moment and try again."
    default:
      if (status >= 500) return "The server had a problem. Please try again shortly."
      if (status >= 400) return "Something went wrong with that request."
      return "Something went wrong. Please try again."
  }
}

function collectFieldErrors(body: ApiErrorBody | undefined): Record<string, string> {
  if (!body?.errors) return {}
  return body.errors.reduce<Record<string, string>>((acc, issue) => {
    if (issue.field) acc[issue.field] = issue.message || "Invalid value"
    return acc
  }, {})
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error

  if (!axios.isAxiosError(error)) {
    const message = error instanceof Error && error.message ? error.message : null
    return new ApiError(message || "Something went wrong. Please try again.")
  }

  const status = error.response?.status
  const body = error.response?.data as ApiErrorBody | undefined

  if (error.code === "ECONNABORTED" || error.message.toLowerCase().includes("timeout")) {
    return new ApiError("The request took too long. Please try again.", status)
  }

  if (!error.response) {
    return new ApiError("Cannot reach the server. Please check your connection.", undefined)
  }

  const fieldErrors = collectFieldErrors(body)
  const message =
    body?.message ||
    statusMessage(status ?? 0)

  return new ApiError(message, status, fieldErrors)
}

export function getApiErrorMessage(error: unknown): string {
  return toApiError(error).message
}

export function getFieldErrors(error: unknown): Record<string, string> {
  return toApiError(error).fieldErrors
}

export function getApiErrorStatus(error: unknown): number | undefined {
  return toApiError(error).status
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const { data } = await authClient.post<LoginResponse>("/auth/refresh")
    accessToken = data.accessToken
    return accessToken
  } catch {
    accessToken = null
    return null
  }
}

export function refreshSession(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

api.interceptors.request.use((config) => {
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = "Bearer " + accessToken
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(toApiError(error))

    const original = error.config as RetriableConfig | undefined
    const isAuthRoute = original?.url?.includes("/auth/") ?? false
    const unauthorized = error.response?.status === 401

    if (unauthorized && original && !original._retried && !isAuthRoute) {
      original._retried = true
      const token = await refreshSession()
      if (token) {
        return api(original)
      }
      accessToken = null
      sessionExpiredHandler?.()
    }

    return Promise.reject(toApiError(error))
  }
)
