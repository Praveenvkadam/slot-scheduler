const mongoose = require("mongoose")

const slotSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true
  },

  topic: {                      // ✅ store topic directly
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  dayNumber: {
    type: Number,
    required: true
  },
  startTime: {
    type: String,
    default: "10:00 AM"
  },
  endTime: {
    type: String,
    default: "12:00 PM"
  },

  maxStudents: {
    type: Number,
    default: 30
  }

}, { timestamps: true })

module.exports = mongoose.model("Slot", slotSchema)
