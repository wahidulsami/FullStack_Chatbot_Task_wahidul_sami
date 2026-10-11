import "dotenv/config"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import connectDB from "../config/db"
import User from "../models/admin"

const WEAK_PASSWORDS = new Set([
  "admin123",
  "admin1234",
  "password",
  "password123",
  "12345678",
  "123456789",
  "qwerty123",
  "letmein123",
])

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    console.error(`[seedAdmin] Missing required environment variable: ${name}`)
    process.exit(1)
  }
  return value
}

function assertUsablePassword(password: string): void {
  if (password.length < 8) {
    console.error("[seedAdmin] ADMIN_PASSWORD must be at least 8 characters")
    process.exit(1)
  }
  if (WEAK_PASSWORDS.has(password.toLowerCase())) {
    console.error("[seedAdmin] ADMIN_PASSWORD is too common, choose a stronger password")
    process.exit(1)
  }
}

async function seedAdmin(): Promise<void> {
  const name = requireEnv("ADMIN_NAME")
  const email = requireEnv("ADMIN_EMAIL").toLowerCase()
  const password = requireEnv("ADMIN_PASSWORD")

  assertUsablePassword(password)

  await connectDB()

  const existing = await User.findOne({ email })
  if (existing) {
    console.log(`[seedAdmin] Admin already exists for ${email}, nothing changed`)
    return
  }

  const admin = await User.create({ name, email, password, role: "admin" })

  const stored = await User.findById(admin.id).select("+password")
  const hashed = stored?.password ?? ""
  const isHashed = hashed.startsWith("$2") && hashed !== password

  if (!isHashed || !(await bcrypt.compare(password, hashed))) {
    throw new Error("Password was not stored as a bcrypt hash")
  }

  console.log(`[seedAdmin] Admin created: ${email} (role: ${stored?.role})`)
  console.log("[seedAdmin] Password stored as a bcrypt hash, never logged or returned")
}

seedAdmin()
  .catch((error: unknown) => {
    console.error("[seedAdmin] Failed:", error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
