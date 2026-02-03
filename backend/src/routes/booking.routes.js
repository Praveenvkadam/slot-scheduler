const router = require("express").Router()
const ctrl = require("../controllers/booking.controller")
const auth = require("../middlewares/auth.middleware")

router.post("/:slotId", auth, ctrl.bookSlot)
router.delete("/:slotId", auth, ctrl.cancelBooking)
router.get("/me", auth, ctrl.getMyBookings)

module.exports = router
