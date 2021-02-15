const database = require("../infraestructure/db.js");

async function favoriteUserBooks(userId, num1, num2) {
  const pool = await database.getPool();
  const query =
    "select * from product where id_product = ANY(select product from purchase where favorite = 1 and buyer = ?) and purchaseState is null limit ?,?";
  const [favorites] = await pool.query(query, [userId, num1, num2]);

  return favorites;
}

async function purchaseUserBooks(userId, num1, num2) {
  const pool = await database.getPool();
  const query =
    "select * from product where id_product = ANY(select product from purchase where purchase = 1 and buyer = ?) limit ?,?";
  const [purchase] = await pool.query(query, [userId, num1, num2]);
  return purchase;
}

async function sellUserBooks(userId, num1, num2) {
  const pool = await database.getPool();
  const query =
    " select * from product where seller = ? and purchaseState is null limit ?,?";
  const [sell] = await pool.query(query, [userId, num1, num2]);
  return sell;
}

async function offersUserBooks(userId, num1, num2) {
  const pool = await database.getPool();
  const query =
    "select id_product, productName, author, price, photoFront from product where seller = ? and id_product = any(select distinct product from purchase) limit ?,?";
  const [offers] = await pool.query(query, [userId, num1, num2]);
  return offers;
}

async function favouritesBooksUser(book) {
  const pool = await database.getPool();
  const queryFavourite =
    "select count(favorite) as count from purchase where favorite = 1 and product = ?";
  const queryPurchase =
    "select distinct product, purchase, reservation, opinion, assessment, reserveDate from purchase where product = ? and favorite !=1";
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
