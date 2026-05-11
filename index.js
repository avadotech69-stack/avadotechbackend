const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const uploadRoutes = require("./routes/upload");
const portfolioRoute = require("./routes/portfolioBanner");
const servicesRoute = require("./routes/services");
const worksRoute = require("./routes/works");

const app = express();


// ✅ Proper CORS Setup (Localhost + Cloudflare + Domain)
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

app.use(express.json());

// Upload Route
app.use("/api/upload", uploadRoutes);

// Root test
app.get("/", (req, res) => {
  res.send("AvadoTech backend is running 🚀");
});

// 🔥 PostgreSQL DB Test Route
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      message: "DB connected successfully!",
      time: result.rows[0]
    });
  } catch (error) {
    console.error("DB Test Error:", error);
    res.status(500).json({
      message: "DB connection failed",
      error: error.message,
    });
  }
});

// 🔥 Banner CRUD
app.use("/api/portfolio-banners", portfolioRoute);

// 🔥 Services CRUD
app.use("/api/services", servicesRoute);

// 🔥 Works CRUD
app.use("/api/works", worksRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
