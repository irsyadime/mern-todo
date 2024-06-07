const express = require("express");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todoRoutes");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());

connectDB();

app.use(bodyParser.json());

app.use("/api/todos", todoRouter);

app.use(errorHandler);

module.exports = app;
