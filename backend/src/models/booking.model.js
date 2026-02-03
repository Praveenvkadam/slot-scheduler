const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  status: {
    type: String,
    enum: ["selected", "submitted", "cancelled"],
    default: "selected"
  }
}, { timestamps: true })

bookingSchema.index({ userId: 1, slotId: 1 }, { unique: true })

module.exports = mongoose.model("Booking", bookingSchema)
