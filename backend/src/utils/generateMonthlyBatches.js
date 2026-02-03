const Batch = require("../models/batch.model")
const Slot = require("../models/slot.model")

function generateClassDates(startDate) {
  const dates = []
  const current = new Date(startDate)

  while (dates.length < 7) {
    if (current.getDay() !== 0) { 
      dates.push(new Date(current))
    }
    current.setDate(current.getDate() + 1)
  }
  return dates
}

module.exports = async function (month, year) {
  const exists = await Batch.countDocuments({ month, year })
  if (exists > 0) return

  let start = new Date(year, month - 1, 1)
  let batchNumber = 1


  while (start.getMonth() === month - 1) {
    const classDates = generateClassDates(start)
    
    if (classDates[0].getMonth() !== month - 1) break
    
    const endDate = classDates[classDates.length - 1]

    const batch = await Batch.create({
      month,
      year,
      batchNumber,
      startDate: start,
      endDate
    })

    const slots = classDates.map((date, index) => ({
      batchId: batch._id,
      date,
      dayNumber: index + 1,
      topic: `Topic ${index + 1}`
    }))

    await Slot.insertMany(slots)

    start = new Date(endDate)
    start.setDate(start.getDate() + 3)
    batchNumber++
  }
} 