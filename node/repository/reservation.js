const database = require("../infraestructure/db.js");

async function getReservedBooks(userId, num1, num2) {
  const pool = await database.getPool();
  const query =
    "select * from product where id_product = ANY( select product from purchase where reservation = 1 and buyer = ?) limit ?,?";
  const [reservedBook] = await pool.query(query, [userId, num1, num2]);
  return reservedBook;
}

module.exports = { getReservedBooks };
