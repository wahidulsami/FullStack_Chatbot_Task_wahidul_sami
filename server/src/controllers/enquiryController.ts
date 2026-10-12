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

import { enquiryListQuerySchema } from "../lib/validation"

export async function listEnquiries(req: Request, res: Response) {
  try {
    const query = enquiryListQuerySchema.parse(req.query)
    const {
      status,
      userType,
      page = 1,
      limit = 20,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      cursor,
      strategy = "offset",
    } = query

    const filter: Record<string, unknown> = {}
    if (status) filter.status = status
    if (userType) filter.userType = userType

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const searchRegex = new RegExp(escaped, "i")
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { interest: searchRegex },
        { message: searchRegex },
      ]
    }

    // Parallel aggregate stats for executive overview cards
    const [totalStats, newStats, inProgressStats, closedStats] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "New" }),
      Enquiry.countDocuments({ status: { $in: ["In Progress", "Contacted"] } }),
      Enquiry.countDocuments({ status: "Closed" }),
    ])

    const stats = {
      total: totalStats,
      new: newStats,
      inProgress: inProgressStats,
      closed: closedStats,
    }

    const sortDirection: 1 | -1 = sortOrder === "asc" ? 1 : -1
    const sortOptions: Record<string, 1 | -1> = { [sortBy]: sortDirection, _id: sortDirection }

    if (strategy === "cursor" && cursor) {
      try {
        const decoded = Buffer.from(cursor, "base64").toString("utf-8")
        const [, cursorId] = decoded.split(":")
        if (cursorId && isValidObjectId(cursorId)) {
          if (sortDirection === -1) {
            filter._id = { $lt: cursorId }
          } else {
            filter._id = { $gt: cursorId }
          }
        }
      } catch {
        // Fall back to clean query on invalid cursor
      }
    }

    const totalMatching = await Enquiry.countDocuments(filter)
    const totalPages = Math.max(1, Math.ceil(totalMatching / limit))
    const validPage = Math.max(1, Math.min(page, totalPages))
    const skip = (validPage - 1) * limit

    const enquiries =
      strategy === "cursor"
        ? await Enquiry.find(filter).sort(sortOptions).limit(limit)
        : await Enquiry.find(filter).sort(sortOptions).skip(skip).limit(limit)

    const nextCursor =
      enquiries.length > 0
        ? Buffer.from(`${sortBy}:${enquiries[enquiries.length - 1]._id}`).toString("base64")
        : null

    const pagination = {
      total: totalMatching,
      page: validPage,
      limit,
      totalPages,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
      nextCursor: validPage < totalPages ? nextCursor : null,
    }

    res.json({
      enquiries,
      count: enquiries.length,
      pagination,
      stats,
    })
  } catch (error) {
    if (error && typeof error === "object" && "issues" in error) {
      return res.status(400).json({ message: "Invalid query parameters", errors: (error as { issues: unknown }).issues })
    }
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
