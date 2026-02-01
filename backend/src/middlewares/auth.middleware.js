const AppError = require("../errors/AppError")
const { verifyToken } = require("../utils/jwt")

const protect = (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError("Not authorized, token missing", 401))
  }

  try {
    const decoded = verifyToken(token)

    if (!decoded || !decoded.id) {
      return next(new AppError("Invalid token payload", 401))
    }

    req.user = { id: decoded.id }
    next()
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Not authorized, token expired", 401))
    }
    return next(new AppError("Not authorized, invalid token", 401))
  }
}

module.exports = protect
