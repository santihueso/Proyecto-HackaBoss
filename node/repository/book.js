const database = require("../infraestructure/db.js");

async function lastBooks(seller) {
  const pool = await database.getPool();
  const query =
    "select * from product where publicationDate >= CURDATE() - 7 and state is null";
  const [lastBooks] = await pool.query(query, seller);
  return lastBooks;
}

async function selectBook(bookID) {
  const pool = await database.getPool();
  const query = "select * from product where id_product = ?";
  const [book] = await pool.query(query, bookID);
  return book;
}

async function category() {
  const pool = await database.getPool();
  const query = "select * from category";
  const [categories] = await pool.query(query);
  return categories;
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
    "insert into product(productName, photoFront, photoBack, descriptionProduct, publicationDate, price, bookLanguage, seller, author,category)values(?,?,?,?,?,?,?,?, ?, ?)";
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
  id_user,
  id_product
) {
  const pool = await database.getPool();
  const insertQuery =
    "UPDATE product SET productName = ?, photoFront = ?, photoBack = ?, descriptionProduct = ?, price = ?, bookLanguage = ?, author = ?, category = ? WHERE seller = ? and id_product = ? ";
  const [editBook] = await pool.query(insertQuery, [
    productName,
    photoFront,
    photoBack,
    descriptionProduct,
    price,
    bookLanguage,
    author,
    category,
    id_user,
    id_product,
  ]);
  return editBook;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

async function deleteBook(seller, book) {
  const pool = await database.getPool();
  const query = "delete from product where seller = ? and id_product = ?";
  const [deleteBook] = await pool.query(query, [seller, book]);
  return deleteBook;
}
//revisar
async function soldBook(seller) {
  const pool = await database.getPool();
  const query =
    "select * from product as p inner join purchase as pr on p.seller = ? and pr.purchase =1";
  const [sold] = await pool.query(query, seller);
  return sold;
}

module.exports = {
  lastBooks,
  selectBook,
  category,
  createBook,
  editBook,
  deleteBook,
  soldBook,
};
