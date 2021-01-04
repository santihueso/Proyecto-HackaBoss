const database = require("../infraestructure/db.js");

async function showProfileFromOutside(userId) {
  const pool = await database.getPool();
  const query =
    " select u.username, p.price, p.productName as tittle from user as u inner join product as p on u.id_user = p.seller and p.seller = ?";
  const [forSell] = await pool.query(query, userId);
  return forSell;
}

module.exports = { showProfileFromOutside };
