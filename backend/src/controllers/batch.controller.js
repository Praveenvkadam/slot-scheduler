const Batch = require("../models/batch.model")
const Slot = require("../models/slot.model")

const isSunday = (date) => date.getDay() === 0

const nextWorkingDay = (date) => {
  const d = new Date(date)
  while (isSunday(d)) {
    d.setDate(d.getDate() + 1)
  }
  return d
}

exports.generateMonthlyBatches = async (req, res) => {
  try {
    const { month, year } = req.body

    const exists = await Batch.findOne({ month, year })
    if (exists) return res.status(400).json({ message: "Already generated" })

    let pointerDate = new Date(year, month - 1, 1) 

    const topics = [
      "HTML", "CSS", "JavaScript", "React",
      "Node js", "MongoDB", "System Design"
    ]

    for (let batchNo = 1; batchNo <= 3; batchNo++) {

      let classDates = []
      let current = new Date(pointerDate)

      while (classDates.length < 7) {
        if (!isSunday(current)) {
          classDates.push(new Date(current))
        }
        current.setDate(current.getDate() + 1)
      }

      const batchStart = classDates[0]
      const batchEnd = classDates[classDates.length - 1]

      const batch = await Batch.create({
        month,
        year,
        batchNumber: batchNo,
        startDate: batchStart,
        endDate: batchEnd,
      })

      for (let date of classDates) {
        for (let topic of topics) {
          await Slot.create({
            batchId: batch._id,
            date,
            topic,
            maxStudents: 10,
          })
        }
      }

      pointerDate = new Date(batchEnd)
      pointerDate.setDate(pointerDate.getDate() + 3) 
      pointerDate = nextWorkingDay(pointerDate)
    }

    res.status(201).json({ message: "Monthly schedule generated" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
