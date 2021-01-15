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

//----------valoraciones--------------------------------------------------------------------------------------------------------------------------------------------------

async function ifBuyed(id_product) {
  const pool = await database.getPool();
  const query = "Select purchase from purchase where product = ?";
  const [book] = await pool.query(query, id_product);
  return book;
}

async function ratingPurchase(id_product) {
  const pool = await database.getPool();
  const insertQuery = "Insert into purchase (assessment) values (?)";
  const [assesment] = await pool.query(insertQuery, [id_product]);
  return assesment;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  getBook,
  selectUser,
  createBook,
  editBook,
  deleteBook,
  ratingPurchase,
  ifBuyed,
};
