const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const uploadRoutes = require("./routes/upload");

const app = express();

// ✅ Proper CORS Setup (Localhost + Cloudflare)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "https://avadotech.pages.dev",
      "https://avadotechbd.com"
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use("/api/upload", uploadRoutes);

// Routes Import
const bannerRoutes = require("./routes/banner");

// Test route
app.get("/", (req, res) => {
  res.send("AvadoTech backend is running 🚀");
});

// DB test
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ message: "DB connected successfully!", rows });
  } catch (error) {
    res.status(500).json({ message: "DB connection failed", error });
  }
});

// 🔥 Banner CRUD Route
app.use("/api/banners", bannerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
