const database = require("../infraestructure/db.js");

async function ifReservedOrBuyed(bookId) {
  const pool = await database.getPool();
  const query = "select reservation, purchase from purchase where product = ?";
  const [book] = await pool.query(query, bookId);
  return book;
}

async function reserverBook(book, reservation, buyer) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase (product, reservation, buyer) values(?,?,?)";
  const [reserver] = await pool.query(insertQuery, [book, reservation, buyer]);
  return reserver;
}

async function findUserIfReserverBook(bookId) {
  const pool = await database.getPool();
  const query =
    "select buyer from purchase where product = ? and reservation = 1";
  const [user] = await pool.query(query, bookId);
  return user;
}

async function ifYouHaveFavoriteBookYet(bookId) {
  const pool = await database.getPool();
  const query = "select buyer from purchase where product = ? and favorite = 1";
  const [user] = await pool.query(query, bookId);
  return user;
}

async function updateWeReserve(buyBook, userId, date) {
  const pool = await database.getPool();

  const insertQuery =
    "update purchase set purchase = ?, reservation = 0, purchaseDate = ? where buyer = ?";
  const [buy] = await pool.query(insertQuery, [buyBook, date, userId]);
  return buy;
}

async function findBook(bookId) {
  const pool = await database.getPool();
  const query = "select * from product where id_product = ?";
  const [book] = await pool.query(query, bookId);
  return book;
}

async function buyBook(book, buyBookId, buyer, date) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase (product, purchase, buyer, purchaseDate) values(?,?,?,?)";
  const [buy] = await pool.query(insertQuery, [book, buyBookId, buyer, date]);
  return buy;
}

async function favorites(book, favorite, buyer) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase(product, favorite, buyer) values(?,?,?)";
  const [favoriteBook] = await pool.query(insertQuery, [book, favorite, buyer]);
  return favoriteBook;
}

async function deleteReservation(bookId, userId) {
  const pool = await database.getPool();
  console.log(bookId, userId);
  const insertQuery = "delete from purchase where product = ? and buyer = ?";
  const [deleteBook] = await pool.query(insertQuery, [bookId, userId]);

  return deleteBook;
}

async function deleteFavorite(bookId, userId) {
  const pool = await database.getPool();
  const insertQuery = "delete from purchase where product = ? and buyer = ?";
  const [deleteBook] = await pool.query(insertQuery, [bookId, userId]);
  return deleteBook;
}

async function ifBuyed(id_product) {
  const pool = await database.getPool();
  const query = "Select purchase, buyer from purchase where product = ?";
  const [book] = await pool.query(query, id_product);
  return book;
}

async function ratingPurchase(comment, opinion, product, buyer) {
  const pool = await database.getPool();
  const insertQuery =
    "Update purchase set assessment = ?, opinion = ? where buyer = ? and product = ?";
  const [assesment] = await pool.query(insertQuery, [
    comment,
    opinion,

    buyer,
    product,
  ]);
  return assesment;
}

module.exports = {
  ifReservedOrBuyed,
  reserverBook,
  findUserIfReserverBook,
  updateWeReserve,
  buyBook,
  favorites,
  findBook,
  ifYouHaveFavoriteBookYet,
  deleteReservation,
  deleteFavorite,
  ifBuyed,
  ratingPurchase,
};
