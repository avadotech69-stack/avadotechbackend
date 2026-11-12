require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
});

async function exportData() {
  try {
    console.log("Connecting to old database...");
    
    // Get all tables data
    const bannersRes = await pool.query("SELECT * FROM portfolio_banners ORDER BY id ASC");
    const servicesRes = await pool.query("SELECT * FROM services ORDER BY id ASC");
    const worksRes = await pool.query("SELECT * FROM works ORDER BY id ASC");
    
    let sqlContent = `-- Database Backup Data\n`;
    sqlContent += `-- WARNING: Running this will overwrite/delete existing data in these tables!\n`;
    sqlContent += `TRUNCATE TABLE portfolio_banners, services, works RESTART IDENTITY CASCADE;\n\n`;

    // 1. portfolio_banners
    if (bannersRes.rows.length > 0) {
      sqlContent += `-- Insert portfolio_banners\n`;
      bannersRes.rows.forEach(row => {
        const url = row.image_url.replace(/'/g, "''");
        const createdAtStr = row.created_at ? row.created_at.toISOString() : new Date().toISOString();
        sqlContent += `INSERT INTO portfolio_banners (id, image_url, created_at) VALUES (${row.id}, '${url}', '${createdAtStr}');\n`;
      });
      sqlContent += `SELECT setval('portfolio_banners_id_seq', (SELECT MAX(id) FROM portfolio_banners));\n\n`;
    }

    // 2. services
    if (servicesRes.rows.length > 0) {
      sqlContent += `-- Insert services\n`;
      servicesRes.rows.forEach(row => {
        const title = row.title.replace(/'/g, "''");
        const url = row.image_url.replace(/'/g, "''");
        const createdAtStr = row.created_at ? row.created_at.toISOString() : new Date().toISOString();
        sqlContent += `INSERT INTO services (id, title, image_url, created_at) VALUES (${row.id}, '${title}', '${url}', '${createdAtStr}');\n`;
      });
      sqlContent += `SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));\n\n`;
    }

    // 3. works
    if (worksRes.rows.length > 0) {
      sqlContent += `-- Insert works\n`;
      worksRes.rows.forEach(row => {
        const name = row.name.replace(/'/g, "''");
        const desc = row.description ? `'${row.description.replace(/'/g, "''")}'` : 'NULL';
        const url = row.image_url.replace(/'/g, "''");
        const link = row.link ? `'${row.link.replace(/'/g, "''")}'` : 'NULL';
        const createdAtStr = row.created_at ? row.created_at.toISOString() : new Date().toISOString();
        sqlContent += `INSERT INTO works (id, name, description, image_url, link, created_at) VALUES (${row.id}, '${name}', ${desc}, '${url}', ${link}, '${createdAtStr}');\n`;
      });
      sqlContent += `SELECT setval('works_id_seq', (SELECT MAX(id) FROM works));\n\n`;
    }

    const outputPath = path.join(__dirname, "backup_data.sql");
    fs.writeFileSync(outputPath, sqlContent, "utf8");
    console.log(`✅ Success! Data exported to ${outputPath}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error exporting data:", err);
    process.exit(1);
  }
}

exportData();
