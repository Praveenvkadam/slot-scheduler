const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = { generateToken };