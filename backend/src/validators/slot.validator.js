const { z } = require("zod")

exports.bookSlotSchema = z.object({
  params: z.object({
    slotId: z.string().length(24, "Invalid slot id"),
  }),
})

exports.cancelSlotSchema = z.object({
  params: z.object({
    slotId: z.string().length(24, "Invalid slot id"),
  }),
})
