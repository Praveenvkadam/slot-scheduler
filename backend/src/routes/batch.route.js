const express = require("express")
const router = express.Router()

const batchController = require("../controllers/batch.controller")
const auth = require("../middlewares/auth.middleware")
const { validate } = require("../middlewares/validate.middleware")
const { generateBatchSchema } = require("../validators/batch.validator")


router.post("/generate", auth, validate(generateBatchSchema), batchController.generateMonthlyBatches)

module.exports = router
