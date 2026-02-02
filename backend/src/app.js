const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const authRouter = require("./routes/user.routers")
const slotRouter = require("./routes/slot.routes")
const batchRouter = require("./routes/batch.route") 

const errorHandler = require("./errors/error.middleware")

const app = express()

console.log("APP.JS LOADED") 

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json({ strict: false }))

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: "Invalid JSON format"
    })
  }
  next(err)
})

app.get("/ping", (req, res) => res.send("pong"))


app.use("/api/auth", authRouter)
app.use("/api/slots", slotRouter)
app.use("/api/batches", batchRouter)

app.use(errorHandler)

module.exports = app