require("dotenv").config();
const pool = require("./db");

async function createWorksTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS works (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        link TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Works table created or already exists.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating works table:", err);
    process.exit(1);
  }
}

createWorksTable();
