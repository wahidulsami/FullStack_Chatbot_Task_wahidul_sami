import jwt, { type SignOptions } from "jsonwebtoken"
import crypto from "crypto"
import type { Role } from "../models/admin"

export interface JwtPayload {
  id: string
  role: Role
}

type TokenType = "access" | "refresh"

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value
}

let secretsChecked = false

function assertDistinctSecrets(): void {
  if (secretsChecked) return
  if (getEnv("JWT_ACCESS_SECRET") === getEnv("JWT_REFRESH_SECRET")) {
    throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different values")
  }
  secretsChecked = true
}

function signToken(payload: JwtPayload, type: TokenType, secretEnv: string, expiresIn: string) {
  assertDistinctSecrets()
  const options: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] }
  return jwt.sign({ ...payload, type }, getEnv(secretEnv), options)
}

function verifyToken(token: string, type: TokenType, secretEnv: string): JwtPayload {
  assertDistinctSecrets()
  const decoded = jwt.verify(token, getEnv(secretEnv)) as JwtPayload & { type?: TokenType }
  if (decoded.type !== type) {
    throw new Error(`Invalid token type: expected ${type}`)
  }
  return { id: decoded.id, role: decoded.role }
}

export function signAccessToken(payload: JwtPayload): string {
  return signToken(payload, "access", "JWT_ACCESS_SECRET", process.env.JWT_ACCESS_EXPIRES_IN || "15m")
}

export function signRefreshToken(payload: JwtPayload): string {
  return signToken(payload, "refresh", "JWT_REFRESH_SECRET", process.env.JWT_REFRESH_EXPIRES_IN || "7d")
}

export function verifyAccessToken(token: string): JwtPayload {
  return verifyToken(token, "access", "JWT_ACCESS_SECRET")
}

export function verifyRefreshToken(token: string): JwtPayload {
  return verifyToken(token, "refresh", "JWT_REFRESH_SECRET")
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex")
}
