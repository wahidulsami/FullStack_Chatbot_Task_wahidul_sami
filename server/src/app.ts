import "express-async-errors"
import cors from "cors"
import express from "express"
import type { NextFunction, Request, Response } from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import enquiryRoutes from "./routes/enquiryRoutes"
import authRoutes from "./routes/authRoutes"

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
)
app.use(express.json({ limit: "50kb" }))
app.use(cookieParser())
app.use(mongoSanitize())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use("/api", limiter)

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/enquiries", enquiryRoutes)
app.use("/api/auth", authRoutes)

// Global error handler: express-async-errors routes async controller/DB errors
// here too, so a failed query responds 500 instead of crashing the process.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const error = err as { name?: string; status?: number; statusCode?: number; expose?: boolean; message?: string }
  const status = error?.status ?? error?.statusCode

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    res.status(400).json({ message: "Invalid request data" })
    return
  }

  if (status !== undefined && status >= 400 && status < 500) {
    res.status(status).json({
      message: error.expose && typeof error.message === "string" ? error.message : "Invalid request",
    })
    return
  }

  console.error(err)
  res.status(500).json({ message: "Server error" })
})

export { app }
