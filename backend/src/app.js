const express = require('express');


const app = express();

// Connect to database

app.use(express.json());

module.exports = app;