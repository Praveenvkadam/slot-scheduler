const Slot = require("../models/slot.model")
const Booking = require("../models/booking.model")

exports.getSlots = async (req, res) => {
  const slots = await Slot.find()
    .populate("batchId", "month year batchNumber")
    .sort({ date: 1 })
  res.json(slots)
}

exports.getSlotAvailability = async (req, res) => {
  const slot = await Slot.findById(req.params.slotId)
  const booked = await Booking.countDocuments({ slotId: slot._id, status: { $ne: "cancelled" } })
  res.json({ max: slot.maxStudents, booked, remaining: slot.maxStudents - booked })
}
