import { Router } from "express"
import rateLimit from "express-rate-limit"
import { login, logout, me, refresh } from "../controllers/authController"
import { protect } from "../middleware/authMiddleware"
import { validate } from "../middleware/validate"
import { loginSchema } from "../lib/validation"

const router = Router()

const WINDOW_MS = 15 * 60 * 1000

// Brute-force protection: only failed attempts (status >= 400) count.
const loginLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please wait a moment and try again." },
})

// Refresh is called on every page load; keep it generous but bounded.
const refreshLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please wait a moment and try again." },
})

router.post("/login", loginLimiter, validate(loginSchema), login)
router.post("/refresh", refreshLimiter, refresh)
router.post("/logout", logout)
router.get("/me", protect, me)

export default router
