const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const authRouter = require("./routes/user.routers")
const slotRouter = require("./routes/slot.routes")
const batchRouter = require("./routes/batch.route") 
const bookingRouter = require("./routes/booking.routes")

const errorHandler = require("./errors/error.middleware")


const app = express()

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// Body parser
app.use(express.json())

// Health check
app.get("/ping", (req, res) => res.send("pong"))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/slots", slotRouter)
app.use("/api/batches", batchRouter)
app.use("/api/bookings", bookingRouter)

// JSON parse error handler (must be AFTER routes)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON format" })
  }
  next(err)
})


// 404 handler (before global error handler)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})


// Global error handler (last middleware always)
app.use(errorHandler)

module.exports = app
