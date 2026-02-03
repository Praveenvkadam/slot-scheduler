const router = require("express").Router()
const ctrl = require("../controllers/batch.controller")

router.post("/init-month", ctrl.initMonth)
router.get("/", ctrl.getBatches)
router.get("/:batchId/slots", ctrl.getBatchSlots)

module.exports = router
