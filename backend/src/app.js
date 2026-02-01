const express = require("express");
const cors = require("cors"); 
const userRouter = require("./routes/user.routers");
const errorHandler = require("./errors/error.middleware");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.client_URL ,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", userRouter);

app.use(errorHandler);

module.exports = app;