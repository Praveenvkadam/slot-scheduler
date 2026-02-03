const generateMonthlyBatches = require("../utils/generateMonthlyBatches")
const Batch = require("../models/batch.model")
const Slot = require("../models/slot.model")

exports.initMonth = async (req, res) => {
  const { month, year } = req.body
  await generateMonthlyBatches(month, year)
  res.json({ message: "3 batches created" })
}

exports.getBatches = async (req, res) => {
  const batches = await Batch.find().sort({ year: -1, month: -1, batchNumber: 1 })
  res.json(batches)
}

exports.getBatchSlots = async (req, res) => {
  const slots = await Slot.find({ batchId: req.params.batchId }).sort({ date: 1 })
  res.json(slots)
}
