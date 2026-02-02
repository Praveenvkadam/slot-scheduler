const mongoose = require("mongoose")

const slotSchema = new mongoose.Schema(
  {
    batchId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Batch", 
      required: true 
    },

    date: { 
      type: Date, 
      required: true 
    },

    topic: { 
      type: String, 
      required: true 
    },

    maxStudents: { 
      type: Number, 
      default: 10 
    },

    students: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Slot", slotSchema)
