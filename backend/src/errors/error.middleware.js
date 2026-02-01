const { ZodError } = require("zod")
const AppError = require("../errors/AppError")

const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Validation Error",
      errors: err.errors.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })),
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  console.error("UNEXPECTED ERROR:", err)

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
}

module.exports = errorHandler
