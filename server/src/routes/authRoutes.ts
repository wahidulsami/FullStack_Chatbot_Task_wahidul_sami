import { Router } from "express"
import { login, logout, me, refresh } from "../controllers/authController"
import { protect } from "../middleware/authMiddleware"
import { validate } from "../middleware/validate"
import { loginSchema } from "../lib/validation"

const router = Router()

router.post("/login", validate(loginSchema), login)
router.post("/refresh", refresh)
router.post("/logout", logout)
router.get("/me", protect, me)

export default router
