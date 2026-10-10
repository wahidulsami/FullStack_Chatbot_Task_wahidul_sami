import "dotenv/config"
import express from "express"

const app = express()

app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
