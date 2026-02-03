const Booking = require("../models/booking.model")
const Slot = require("../models/slot.model")

exports.bookSlot = async (req, res) => {
  try {
    const userId = req.user.id
    const { slotId } = req.params

    // Check slot exists
    const slot = await Slot.findById(slotId)
    if (!slot) return res.status(404).json({ message: "Slot not found" })

    // Count active bookings (ignore cancelled)
    const count = await Booking.countDocuments({
      slotId,
      status: { $ne: "cancelled" }
    })

    // Prevent overbooking
    if (count >= slot.maxStudents)
      return res.status(400).json({ message: "Slot full" })

    // Check if user already has a booking record for this slot
    const existing = await Booking.findOne({ userId, slotId })

    if (existing) {
      // If booking exists but was cancelled → reactivate instead of creating new
      if (existing.status === "cancelled") {
        existing.status = "selected"   // Rebook
        await existing.save()
        return res.json({ message: "Slot rebooked" })
      }

      // If already active → block duplicate booking
      return res.status(400).json({ message: "Already booked" })
    }

    // No previous record → create new booking
    await Booking.create({ userId, slotId })

    res.json({ message: "Slot booked" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



exports.cancelBooking = async (req, res) => {
  await Booking.findOneAndUpdate(
    { userId: req.user.id, slotId: req.params.slotId },
    { status: "cancelled" }
  )
  res.json({ message: "Cancelled" })
}

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id, status: { $ne: "cancelled" } })
    .populate({ path: "slotId", populate: { path: "batchId" } })
  res.json(bookings)
}
