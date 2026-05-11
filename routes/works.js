const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all works
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM works ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD work
router.post("/add", async (req, res) => {
  try {
    const { name, description, image_url, link } = req.body;
    if (!name || !image_url) {
      return res.status(400).json({ error: "Name and image_url are required" });
    }
    const result = await pool.query(
      "INSERT INTO works (name, description, image_url, link) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, image_url, link]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE work
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM works WHERE id = $1", [id]);
    res.json({ message: "Work deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
