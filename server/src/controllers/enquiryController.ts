import type { Request, Response } from "express"
import { isValidObjectId } from "mongoose"
import { Enquiry } from "../models/Enquiry"
import type { AuthRequest } from "../middleware/authMiddleware"
import type { EnquiryListQuery } from "../lib/validation"

function serverError(res: Response): void {
  res.status(500).json({ message: "Server error" })
}

export async function createEnquiry(req: Request, res: Response) {
  try {
    const enquiry = await Enquiry.create(req.body)
    res.status(201).json({ enquiry })
  } catch {
    serverError(res)
  }
}

export async function listEnquiries(req: Request, res: Response) {
  try {
    const { status, userType } = req.query as EnquiryListQuery
    const filter: Record<string, string> = {}
    if (status) filter.status = status
    if (userType) filter.userType = userType

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 })
    res.json({ enquiries, count: enquiries.length })
  } catch {
    serverError(res)
  }
}

export async function getEnquiry(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Enquiry not found" })
    }

    const enquiry = await Enquiry.findById(id)
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" })
    }

    res.json({ enquiry })
  } catch {
    serverError(res)
  }
}

export async function updateEnquiryStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Enquiry not found" })
    }

    const enquiry = await Enquiry.findById(id)
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" })
    }

    enquiry.status = req.body.status
    await enquiry.save()

    res.json({ enquiry })
  } catch {
    serverError(res)
  }
}

export async function deleteEnquiry(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return res.status(404).json({ message: "Enquiry not found" })
    }

    const enquiry = await Enquiry.findByIdAndDelete(id)
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" })
    }

    res.json({ message: "Enquiry deleted" })
  } catch {
    serverError(res)
  }
}
