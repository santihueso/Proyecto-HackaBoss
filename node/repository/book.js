const database = require("../infraestructure/db.js");

async function lastBooks() {
  const pool = await database.getPool();
  const query =
    "select productName from product where publicationDate >= CURDATE() - 7";
  const [lastBooks] = await pool.query(query);
  return lastBooks;
}

async function selectBook(bookID) {
  const pool = await database.getPool();
  const query = "select * from product where id_product = ?";
  const [book] = await pool.query(query, bookID);
  return book;
}

async function category(books) {
  const pool = await database.getPool();
  const query = "select * from category";
  const [categories] = await pool.query(query);
  return categories;
}

module.exports = { lastBooks, selectBook, category };
