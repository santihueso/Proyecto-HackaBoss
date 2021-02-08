const database = require("../infraestructure/db.js");

async function goToCategory(category) {
  const pool = await database.getPool();
  const query =
    "select * from product where category = ? and purchaseState  is null";
  const [lCategory] = await pool.query(query, category);
  return lCategory;
}

module.exports = { goToCategory };
