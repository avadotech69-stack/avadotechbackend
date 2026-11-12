const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all services
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD service
router.post("/add", async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    if (!title || !image_url) {
      return res.status(400).json({ error: "Title and image_url are required" });
    }
    const result = await pool.query(
      "INSERT INTO services (title, description, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, description || null, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM services WHERE id = $1", [id]);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
