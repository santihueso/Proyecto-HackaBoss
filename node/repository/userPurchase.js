const database = require("../infraestructure/db.js");

async function favoriteUserBooks(userId) {
  const pool = await database.getPool();
  const query =
    "select * from product where id_product = ANY(select product from purchase where favorite = 1 and buyer = ?) and purchaseState is null";
  const [favorites] = await pool.query(query, userId);

  return favorites;
}

async function purchaseUserBooks(userId) {
  const pool = await database.getPool();
  const query =
    "select * from product where id_product = ANY(select product from purchase where purchase = 1 and buyer = ?)";
  const [purchase] = await pool.query(query, userId);
  return purchase;
}

async function sellUserBooks(userId) {
  const pool = await database.getPool();
  const query =
    " select * from product where seller = ? and purchaseState is null";
  const [sell] = await pool.query(query, userId);
  return sell;
}

async function offersUserBooks(userId) {
  const pool = await database.getPool();
  const query =
    "select * from product as p inner join purchase as u on p.id_product = u.product and p.seller = ?";
  const [offers] = await pool.query(query, userId);
  return offers;
}

module.exports = {
  favoriteUserBooks,
  purchaseUserBooks,
  sellUserBooks,
  offersUserBooks,
};
