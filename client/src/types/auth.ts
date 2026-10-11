export type Role = "admin"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
}

export interface LoginResponse {
  accessToken: string
  user: AuthUser
}

export interface UserResponse {
  user: AuthUser
}
