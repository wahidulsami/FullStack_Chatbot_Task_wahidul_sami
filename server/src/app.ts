import cors from "cors"
import express from "express"
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
// TODO: xss sanitization on req.body

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

export { app }
