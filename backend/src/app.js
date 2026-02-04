const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cron = require("node-cron")

const generateMonthlyBatches = require("./utils/generateMonthlyBatches")

dotenv.config()

const authRouter = require("./routes/user.routers")
const slotRouter = require("./routes/slot.routes")
const batchRouter = require("./routes/batch.route")
const bookingRouter = require("./routes/booking.routes")

const errorHandler = require("./errors/error.middleware")

const app = express()


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
)


app.use(express.json())


app.get("/ping", (req, res) => res.send("pong"))


app.use("/api/auth", authRouter)
app.use("/api/slots", slotRouter)
app.use("/api/batches", batchRouter)
app.use("/api/bookings", bookingRouter)


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON format" })
  }
  next(err)
})


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})


app.use(errorHandler)


cron.schedule("0 0 1 * *", async () => {
  try {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    await generateMonthlyBatches(month, year)
    console.log(`Cron success: batches created for ${month}/${year}`)
  } catch (err) {
    console.error("Cron failed:", err)
  }
})

module.exports = app
