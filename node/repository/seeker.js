const database = require("../infraestructure/db.js");

async function forCategory(nameCategory) {
  const pool = await database.getPool();
  const query =
    "select * from product where category = (select id_category from category where category_name = ?)";
  const [category] = await pool.query(query, nameCategory);
  return category;
}

async function forName(name) {
  const pool = await database.getPool();
  const query = "select * from product where productName = ?";
  const [nameBook] = await pool.query(query, name);
  return nameBook;
}

async function forCity(cp) {
  const pool = await database.getPool();
  const query =
    " select p.productName, p.photoFront, p.photoBack, p.descriptionProduct, p.bookLanguage, p.author, p.category from product as p inner join user as u on u.postalCode = ?";
  const [cpBooks] = await pool.query(query, cp);
  return cpBooks;
}

async function forAuthor(name) {
  const pool = await database.getPool();
  const query = "select * from product where author = ?";
  const [author] = await pool.query(query, name);
  return author;
}

module.exports = { forCategory, forName, forCity, forAuthor };
