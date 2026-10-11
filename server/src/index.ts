import "dotenv/config"
import connectDB from "./config/db"
import { app } from "./app"

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error)
  })
