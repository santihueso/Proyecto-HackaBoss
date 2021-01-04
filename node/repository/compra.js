const database = require("../infraestructure/db.js");

async function ifReservedOrBuyed(bookId) {
  const pool = await database.getPool();
  const query = "select reservation, purchase from purchase where product = ?";
  const [book] = await pool.query(query, bookId);
  return book;
}

async function reserverBook(book, reservationtion, buyer) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase (product, reservation, buyer) values(?,?,?)";
  const [reserver] = await pool.query(insertQuery, [
    book,
    reservationtion,
    buyer,
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

async function updateWeReserve(buyBook, userId) {
  const pool = await database.getPool();
  console.log(userId);
  const insertQuery = "update purchase set purchase = ? where buyer = ?";
  const [buy] = await pool.query(insertQuery, [buyBook, userId]);
  return buy;
}

async function findBook(bookId) {
  const pool = await database.getPool();
  const query = "select * from purchase where product = ?";
  const [book] = await pool.query(query, bookId);
  return book;
}

async function buyBook(book, buyBookId, buyer) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase (product, purchase, buyer) values(?,?,?)";
  const [buy] = await pool.query(insertQuery, [book, buyBookId, buyer]);
  return buy;
}

async function favorites(book, favorite, buyer) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into purchase(product, favorite, buyer) values(?,?,?)";
  const [favoriteBook] = await pool.query(insertQuery, [book, favorite, buyer]);
  return favoriteBook;
}

module.exports = {
  ifReservedOrBuyed,
  reserverBook,
  findUserIfReserverBook,
  updateWeReserve,
  buyBook,
  favorites,
  findBook,
};
