const mongoose = require("mongoose")

const slotSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  date: { type: Date, required: true },
  dayNumber: { type: Number, required: true },
  maxStudents: { type: Number, default: 30 }
}, { timestamps: true })

module.exports = mongoose.model("Slot", slotSchema)
