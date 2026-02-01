const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = require('./app');

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});