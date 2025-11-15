const axios = require("axios");

async function query(sql, params = []) {
  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.D1_ACCOUNT_ID}/d1/database/${process.env.D1_DATABASE_ID}/query`;

    const response = await axios.post(
      url,
      {
        sql,
        params
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.D1_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.results || [];
  } catch (error) {
    console.error("D1 Query Error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { query };
