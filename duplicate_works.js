require("dotenv").config();
const pool = require("./db");

async function duplicateWorks() {
  try {
    // 1. Get the latest work entry
    const res = await pool.query("SELECT * FROM works ORDER BY id DESC LIMIT 1");
    
    if (res.rows.length === 0) {
      console.log("❌ No works found to duplicate.");
      process.exit(0);
    }

    const work = res.rows[0];
    console.log(`🔍 Found work: "${work.name}". Duplicating 5 times...`);

    // 2. Insert it 5 times
    for (let i = 0; i < 5; i++) {
      await pool.query(
        "INSERT INTO works (name, description, image_url, link) VALUES ($1, $2, $3, $4)",
        [work.name, work.description, work.image_url, work.link]
      );
    }

    console.log("✅ Successfully duplicated the work 5 times.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error duplicating works:", err);
    process.exit(1);
  }
}

duplicateWorks();
