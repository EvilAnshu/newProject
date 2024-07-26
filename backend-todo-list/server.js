const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");
require("dotenv").config();
const connectDB = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
