const jwt = require("jsonwebtoken")

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing at startup")
}

const generateToken= (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ,
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken }
