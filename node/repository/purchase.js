const database = require("../infraestructure/db.js");

async function ifReservedOrBuyed(bookId) {
  const pool = await database.getPool();
  const query = "select reservation, purchase from purchase where product = ?";
  const [book] = await pool.query(query, bookId);
  return book;
}

async function reserverBook(book, reservation, buyer, date) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase (product, reservation, buyer, reserveDate) values(?,?,?, ?)";
  const [reserver] = await pool.query(insertQuery, [
    book,
    reservation,
    buyer,
    date,
  ]);
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

async function updateWeReserve(date, book) {
  const pool = await database.getPool();

  const insertQuery =
    "update purchase set purchase = 1, reservation = 0, favorite = 0, purchaseDate = ? where product = ?";
  const insertQueryProduct =
    "update product set purchaseState = 1 where id_product = ?";
  const deleteQuery = "delete from purchase where product = ? and favorite = 1";
  const [buy] = await pool.query(insertQuery, [date, book]);
  const [remove] = await pool.query(insertQueryProduct, book);
  const [rmFavorite] = await pool.query(deleteQuery, book);
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
    "insert into purchase (product, purchase, buyer, purchaseDate, favorite) values(?,?,?,?, 0)";
  const insertQueryProduct =
    "update product set purchaseState = 1 where id_product = ?";
  const deleteQuery = "delete from purchase where product = ? and favorite = 1";
  const [buy] = await pool.query(insertQuery, [book, buyBookId, buyer, date]);
  const [remove] = await pool.query(insertQueryProduct, [book]);
  const [rmFavorite] = await pool.query(deleteQuery, book);
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

async function deleteSellerReserved(book) {
  const pool = await database.getPool();
  const query = "delete from purchase where reservation = 1 and product = ?";
  const [deleteReserved] = await pool.query(query, book);
  return deleteReserved;
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
  deleteSellerReserved,
};
