const express = require("express")
const router = express.Router()  

const slotController = require("../controllers/slot.controller")
const auth = require("../middlewares/auth.middleware")

router.get("/", auth, slotController.getSlots)
router.get("/me", auth, slotController.getMyBookedSlots) 
router.post("/:slotId/book", auth, slotController.bookSlot)
router.delete("/:slotId/cancel", auth, slotController.cancelBooking)
router.get("/:slotId/bookings", auth, slotController.getSlotBookings)

module.exports = router
