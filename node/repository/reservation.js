const database = require("../infraestructure/db.js");

async function getReservedBooks(userId) {
  const pool = await database.getPool();
  const query =
    "select * from product where id_product = ANY( select product from purchase where reservation = 1 and buyer = ?)";
  const [reservedBook] = await pool.query(query, userId);
  return reservedBook;
}

module.exports = { getReservedBooks };
