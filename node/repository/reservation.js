const database = require("../infraestructure/db.js");

async function getReservedBooks(userId) {
  const pool = await database.getPool();
  const query =
    "select * from product where seller = ALL(select buyer from purchase where buyer = ?)";
  const [reservedBook] = await pool.query(query, userId);
  return reservedBook;
}

module.exports = { getReservedBooks };
