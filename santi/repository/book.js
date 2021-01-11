const database = require("../infraestructure/db.js");

async function getBook() {
  const pool = await database.getPool();
  const query = "select * from product where id_product=?";
  const [libro] = await pool.query(query);
  return libro;
}

async function selectUser(userId, bookId) {
  const pool = await database.getPool();
  const insertQuery = "update product set username =? where id_libro = ?";
  const [book] = await pool.query(insertQuery, [userId, bookId]);
  return book;
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
  category,
  postal_code
) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into product(productName, photoFront, photoBack, publicationDate, price, bookLanguage, seller, author,category,postal_code)values(?,?,?,?,?,?,?,?,?,?,?)";
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
    postal_code,
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
    "update product set productName=?, photoFront=?, photoBack=?, descriptionProduct=?, price=?, language=?, author=?, category=? where id_user =? and id_product=? ";
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = { getBook, selectUser, createBook, editBook, deleteBook };
