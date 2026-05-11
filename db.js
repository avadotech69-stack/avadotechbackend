// db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
});

pool.connect()
  .then((client) => {
    console.log("✅ PostgreSQL Connected (Neon DB)");
    client.release(); // 🔥 Crucial: Release the client back to the pool
  })
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

// 🔥 Handle unexpected pool errors to prevent app crash
pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client:", err);
});

module.exports = pool;
