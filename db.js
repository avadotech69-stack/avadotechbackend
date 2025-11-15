// db.js (Cloudflare D1 connector)
const axios = require("axios");

async function query(sql, params = []) {
  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.D1_ACCOUNT_ID}/d1/database/${process.env.D1_DATABASE_ID}/query`;

    const response = await axios.post(
      url,
      { sql, params },
      {
        headers: {
          Authorization: `Bearer ${process.env.D1_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    let rows = [];

    // 🔍 D1 API বিভিন্ন ফরম্যাটে data ফেরত দিতে পারে – সবই handle করছি
    if (Array.isArray(data.results)) {
      rows = data.results;
    } else if (Array.isArray(data.result)) {
      if (data.result.length && Array.isArray(data.result[0].results)) {
        rows = data.result[0].results;
      } else {
        rows = data.result;
      }
    } else if (data.result && Array.isArray(data.result.rows)) {
      rows = data.result.rows;
    }

    return rows;
  } catch (error) {
    console.error("D1 query error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { query };
