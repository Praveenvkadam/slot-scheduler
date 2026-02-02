const { z } = require("zod")

exports.generateBatchSchema = z.object({
  body: z.object({
    month: z
      .number()
      .int()
      .min(1, "Month must be 1–12")
      .max(12, "Month must be 1–12"),

    year: z
      .number()
      .int()
      .min(2024, "Invalid year")
      .max(2100, "Invalid year"),
  }),
})
