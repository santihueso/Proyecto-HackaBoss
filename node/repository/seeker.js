const database = require("../infraestructure/db.js");

async function forCity(city) {
  const pool = await database.getPool();

  const query =
    "select * from product where purchaseState is null and seller = any(select id_user from user where city like ?)";
  const [category] = await pool.query(query, `%${city}%`);
  return category;
}

async function forName(name) {
  const pool = await database.getPool();
  const query =
    "select * from product where productName like ? and purchaseState is null";
  const [nameBook] = await pool.query(query, `%${name}%`);
  return nameBook;
}

async function forCp(cp) {
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

module.exports = { forCp, forName, forCity, forAuthor };
