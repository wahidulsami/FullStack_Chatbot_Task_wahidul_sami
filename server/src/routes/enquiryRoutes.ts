import { Router } from "express"
import {
  createEnquiry,
  deleteEnquiry,
  getEnquiry,
  listEnquiries,
  updateEnquiryStatus,
} from "../controllers/enquiryController"
import { adminOnly, protect } from "../middleware/authMiddleware"
import { validate, validateQuery } from "../middleware/validate"
import { createEnquirySchema, enquiryListQuerySchema, updateEnquiryStatusSchema } from "../lib/validation"

const router = Router()

router.post("/", validate(createEnquirySchema), createEnquiry)

const updateStatus = [protect, adminOnly, validate(updateEnquiryStatusSchema), updateEnquiryStatus]

router.get("/", protect, adminOnly, validateQuery(enquiryListQuerySchema), listEnquiries)
router.get("/:id", protect, adminOnly, getEnquiry)
router.patch("/:id", updateStatus)
router.patch("/:id/status", updateStatus)
router.delete("/:id", protect, adminOnly, deleteEnquiry)

export default router
