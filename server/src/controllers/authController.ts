import type { Request, Response, CookieOptions } from "express"
import User from "../models/admin"
import type { AuthRequest } from "../middleware/authMiddleware"
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
} from "../utils/jwt"

const REFRESH_COOKIE = "refreshToken"

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000, 
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Email and password are required" })
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password")

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" })
  }

  const payload = { id: user.id, role: user.role }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)

  user.refreshTokenHash = hashToken(refreshToken)
  await user.save()

  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions)
  res.json({
    accessToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
}


export async function refresh(req: Request, res: Response) {
  // Ignore any errors that might occur during token verification
  const token = req.cookies?.[REFRESH_COOKIE]
  if (!token) return res.status(401).json({ message: "Not authorized" })

  try {
    const decoded = verifyRefreshToken(token)
    const user = await User.findById(decoded.id).select("+refreshTokenHash")


    if (!user || user.refreshTokenHash !== hashToken(token)) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const payload = { id: user.id, role: user.role }
    const newAccessToken = signAccessToken(payload)
    const newRefreshToken = signRefreshToken(payload)

    user.refreshTokenHash = hashToken(newRefreshToken)
    await user.save()

    res.cookie(REFRESH_COOKIE, newRefreshToken, cookieOptions)
    res.json({ accessToken: newAccessToken })
  } catch {
    return res.status(401).json({ message: "Not authorized" })
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_COOKIE]

  if (token) {
    try {
      const decoded = verifyRefreshToken(token)
      await User.findByIdAndUpdate(decoded.id, { $unset: { refreshTokenHash: 1 } })
    } catch {
      // Ignore token verification errors
    }
  }

  res.clearCookie(REFRESH_COOKIE, { ...cookieOptions, maxAge: undefined })
  res.json({ message: "Logged out" })
}

export async function me(req: AuthRequest, res: Response) {
  try {
    const user = req.user ? await User.findById(req.user.id) : null
    if (!user) {
      return res.status(401).json({ message: "Not authorized" })
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}