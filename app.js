require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-eta-snowy-37.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
const statusRoutes = require("./routes/statusRoutes");
const checkRoutes = require("./routes/checkRoutes");
const competitorRoutes = require("./routes/competitorRoutes");

app.use("/api/status", statusRoutes);
app.use("/api/check", checkRoutes);
app.use("/api/competitors", competitorRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err.message));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});