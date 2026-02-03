const router = require("express").Router()
const ctrl = require("../controllers/slot.controller")

router.get("/", ctrl.getSlots)
router.get("/:slotId/availability", ctrl.getSlotAvailability)

module.exports = router
