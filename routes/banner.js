const express = require("express");
const router = express.Router();

// DB pool import (index.js theke export kora)
const pool = require("../db");  

// ---------------------------
// CREATE Banner
// POST /api/banners
// ---------------------------
router.post("/", async (req, res) => {
  try {
    const { image_url, title, button_text, button_link } = req.body;

    if (!image_url) {
      return res.status(400).json({ error: "image_url is required" });
    }

    const sql =
      "INSERT INTO banners (image_url, title, button_text, button_link) VALUES (?, ?, ?, ?)";

    const [result] = await pool.query(sql, [
      image_url,
      title || null,
      button_text || null,
      button_link || null,
    ]);

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("CREATE banner error:", err);
    res.status(500).json({ error: "Failed to create banner" });
  }
});

// ---------------------------
// GET All Banners
// GET /api/banners
// ---------------------------
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM banners ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET banners error:", err);
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

// ---------------------------
// GET Single Banner
// GET /api/banners/:id
// ---------------------------
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM banners WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("GET single banner error:", err);
    res.status(500).json({ error: "Failed to load banner" });
  }
});

// ---------------------------
// UPDATE Banner
// PUT /api/banners/:id
// ---------------------------
router.put("/:id", async (req, res) => {
  try {
    const { image_url, title, button_text, button_link } = req.body;

    const sql =
      "UPDATE banners SET image_url = ?, title = ?, button_text = ?, button_link = ? WHERE id = ?";

    const [result] = await pool.query(sql, [
      image_url,
      title,
      button_text,
      button_link,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({ success: true, message: "Banner updated" });
  } catch (err) {
    console.error("UPDATE banner error:", err);
    res.status(500).json({ error: "Failed to update banner" });
  }
});

// ---------------------------
// DELETE Banner
// DELETE /api/banners/:id
// ---------------------------
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM banners WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({ success: true, message: "Banner deleted" });
  } catch (err) {
    console.error("DELETE banner error:", err);
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

module.exports = router;
