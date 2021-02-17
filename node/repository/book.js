const database = require("../infraestructure/db.js");

async function lastBooks(seller) {
  const pool = await database.getPool();
  const query =
    "select * from product where publicationDate >= CURDATE() - 2 and purchaseState is null order by publicationDate desc";
  const [lastBooks] = await pool.query(query, seller);
  return lastBooks;
}

async function selectBook(bookID) {
  const pool = await database.getPool();
  const query =
    "select p.id_product, p.productName, p.photoFront, p.photoBack, p.category, p.descriptionProduct, p.price, p.bookLanguage, p.author, p.seller, u.email from product as p inner join user as u on p.seller = u.id_user and id_product = ?";
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
    "select * from purchase as pur inner join product as p where pur.product = p.id_product and p.seller = ? and pur.purchase = 1";
  const [sold] = await pool.query(query, seller);
  return sold;
}

async function existInPurchase(book) {
  const pool = await database.getPool();
  const query = "select * from purchase where product = ?";
  const deletePurchase = "delete from purchase where product = ?";
  const [purchase] = await pool.query(query, book);
  const [rm] = await pool.query(deletePurchase, book);
  return purchase;
}

module.exports = {
  lastBooks,
  selectBook,
  category,
  createBook,
  editBook,
  deleteBook,
  soldBook,
  existInPurchase,
};
