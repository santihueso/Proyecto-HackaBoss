const database = require("../infraestructure/db.js");

async function getUser() {
  const pool = await database.getPool();
  const query = "select * from user";
  const [users] = await pool.query(query);
  return users;
}

async function createUser(name, email, password) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into user (username, email, userPassword) values(?,?,?) ";
  const [createUser] = await pool.query(insertQuery, [name, email, password]);
  return createUser.isertId;
}

async function logearse(email) {
  const pool = await database.getPool();
  const query = "select * from user where email= ?";
  const [user] = await pool.query(query, email);
  return user;
}

async function selectUser(userId) {
  const pool = await database.getPool();
  const query = "select * from user where id_user = ?";
  const [user] = await pool.query(query, userId);
  return user;
}

async function imageUser(img, userId) {
  const pool = await database.getPool();

  const query = "update user set photo = ? where id_user = ?";
  const [image] = await pool.query(query, [img, userId]);
  return image;
}

async function changePassword(password, userId) {
  const pool = await database.getPool();

  const query = "update user set userPassword = ? where id_user = ?";
  const [newPassword] = await pool.query(query, [password, userId]);
  return newPassword;
}

module.exports = {
  getUser,
  createUser,
  logearse,
  selectUser,
  imageUser,
  changePassword,
};
