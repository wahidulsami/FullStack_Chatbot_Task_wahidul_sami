import type { Request, Response, NextFunction } from "express"
import { verifyAccessToken, type JwtPayload } from "../utils/jwt"
import User from "../models/admin"

export interface AuthRequest extends Request {
  user?: JwtPayload
}


export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const token = header.split(" ")[1]
const decoded = verifyAccessToken(token)

   
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: "Not authorized" })
    }

    req.user = { id: user.id, role: user.role }
    next()
  } catch {
  
    return res.status(401).json({ message: "Not authorized" })
  }
}


export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" })
  }
  next()
}