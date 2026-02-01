const express = require("express")

const {
  register,
  login,
  resetPassword,
  getUserProfile
} = require("../controllers/auth.controller")

const protect = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/reset-password", resetPassword)
router.get("/profile", protect,getUserProfile)

module.exports = router
