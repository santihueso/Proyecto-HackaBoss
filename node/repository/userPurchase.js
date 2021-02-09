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
    "select id_product, productName, author, price, photoFront from product where seller = ? and id_product = any(select distinct product from purchase)";
  const [offers] = await pool.query(query, userId);
  return offers;
}

async function favouritesBooksUser(book) {
  const pool = await database.getPool();
  const queryFavourite =
    "select count(favorite) as count from purchase where favorite = 1 and product = ?";
  const queryPurchase =
    "select distinct product, purchase, reservation, opinion, assessment from purchase where product = ? and favorite !=1";
  const [favourite] = await pool.query(queryFavourite, book);
  const [all] = await pool.query(queryPurchase, book);
  return [favourite, all];
}

module.exports = {
  favoriteUserBooks,
  purchaseUserBooks,
  sellUserBooks,
  offersUserBooks,
  favoriteUserBooks,
  favouritesBooksUser,
};
