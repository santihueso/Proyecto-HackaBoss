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

async function getBook() {
  const pool = await database.getPool();
  const query = "select * from product where id_product=?";
  const [libro] = await pool.query(query);
  return libro;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function createBook(
  productName,
  photoFront,
  photoBack,
  descriptionProduct,
  publicationDate,
  price,
  bookLanguage,
  seller,
  author,
  category
) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into product(productName, photoFront, photoBack,descriptionProduct, publicationDate, price, bookLanguage, seller, author,category)values(?,?,?,?,?,?,?,?,?,?)";
  const [createBook] = await pool.query(insertQuery, [
    productName,
    photoFront,
    photoBack,
    descriptionProduct,
    publicationDate,
    price,
    bookLanguage,
    seller,
    author,
    category,
  ]);
  return createBook.isertId;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function editBook(
  productName,
  photoFront,
  photoBack,
  descriptionProduct,
  price,
  bookLanguage,
  author,
  category,
  id_product,
  id_user
) {
  const pool = await database.getPool();
  const insertQuery =
    "UPDATE product SET productName = ?, photoFront = ?, photoBack = ?, descriptionProduct = ?, price = ?, bookLanguage = ?, author = ?, category = ? WHERE id_product = ? ";
  const [editBook] = await pool.query(insertQuery, [
    productName,
    photoFront,
    photoBack,
    descriptionProduct,
    price,
    bookLanguage,
    author,
    category,
    id_product,
    id_user,
  ]);
  return editBook;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

async function deleteBook(id_product) {
  const pool = await database.getPool();
  const query = "DELETE from product where id_product = ?";
  const [deleteBook] = await pool.query(query, [id_product]);
  return deleteBook;
}

module.exports = {
  lastBooks,
  selectBook,
  category,
  getBook,
  createBook,
  editBook,
  deleteBook,
};
