const database = require("../infraestructure/db.js");

async function goToCategory(category, num1, num2) {
  const pool = await database.getPool();
  const query =
    "select * from product where category = ? and purchaseState  is null limit ?, ?";
  const [lCategory] = await pool.query(query, [category, num1, num2]);
  return lCategory;
}

module.exports = { goToCategory };
