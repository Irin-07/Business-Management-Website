require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;