const Slot = require("../models/slot.model")
const User = require("../models/user.model")

exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find().populate("batchId", "month year batchNumber")
    res.status(200).json(slots)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


exports.bookSlot = async (req, res) => {
  try {
    const userId = req.user.id
    const { slotId } = req.params

    const slot = await Slot.findById(slotId)
    if (!slot) return res.status(404).json({ message: "Slot not found" })

    if (slot.students.length >= slot.maxStudents)
      return res.status(400).json({ message: "Slot full" })

    if (slot.students.includes(userId))
      return res.status(400).json({ message: "Already booked" })

    slot.students.push(userId)
    await slot.save()

    await User.findByIdAndUpdate(userId, {
      $addToSet: { selectedSlots: slotId }
    })

    res.status(200).json({ message: "Slot booked successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id
    const { slotId } = req.params

    const slot = await Slot.findById(slotId)
    if (!slot) return res.status(404).json({ message: "Slot not found" })
    slot.students.pull(userId)
    await slot.save()

    await User.findByIdAndUpdate(userId, {
      $pull: { selectedSlots: slotId }
    })

    res.status(200).json({ message: "Booking cancelled" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



exports.getSlotBookings = async (req, res) => {
  try {
    const { slotId } = req.params

    const slot = await Slot.findById(slotId)
      .populate("students", "fullname email phone")

    if (!slot) return res.status(404).json({ message: "Slot not found" })

    res.status(200).json({
      topic: slot.topic,
      date: slot.date,
      totalBooked: slot.students.length,
      students: slot.students,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


exports.getMyBookedSlots = async (req, res) => {
  try {
    const userId = req.user.id

    const slots = await Slot.find({
      students: userId
    }).populate("batchId", "month year batchNumber")

    res.status(200).json(slots)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
