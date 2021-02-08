const database = require("../infraestructure/db.js");

async function forCategory(nameCategory) {
  const pool = await database.getPool();
  const query =
    "select * from product where category = ANY (select id_category from category where category_name like ?) and purchaseState is null";
  const [category] = await pool.query(query, `%${nameCategory}%`);
  return category;
}

async function forName(name) {
  const pool = await database.getPool();
  const query =
    "select * from product where productName like ? and purchaseState is null";
  const [nameBook] = await pool.query(query, `%${name}%`);
  return nameBook;
}

async function forCity(cp) {
  const pool = await database.getPool();
  const query =
    "select * from product where seller = ANY(select id_user from user where postalCode like ?) and purchaseState is null";
  const [cpBooks] = await pool.query(query, `%${cp}%`);
  return cpBooks;
}

async function forAuthor(name) {
  const pool = await database.getPool();
  const query =
    "select * from product where author like ? and purchaseState is null";
  const [author] = await pool.query(query, `%${name}%`);
  return author;
}

module.exports = { forCategory, forName, forCity, forAuthor };
