const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET ALL banners
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM portfolio_banners ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD banner
router.post("/add", async (req, res) => {
  try {
    const { image_url } = req.body;

    if (!image_url) return res.status(400).json({ error: "Image URL missing" });

    const insert = await pool.query(
      "INSERT INTO portfolio_banners (image_url) VALUES ($1) RETURNING *",
      [image_url]
    );

    res.json(insert.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE banner
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query("DELETE FROM portfolio_banners WHERE id = $1", [id]);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
