const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  batchNumber: { type: Number, required: true }, 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true })

batchSchema.index({ month: 1, year: 1, batchNumber: 1 }, { unique: true })

module.exports = mongoose.model("Batch", batchSchema)
