const database = require("../infraestructure/db.js");

async function getUser() {
  const pool = await database.getPool();
  const query = "select * from user";
  const [users] = await pool.query(query);
  return users;
}

async function selectUser(userId) {
  const pool = await database.getPool();
  const query =
    "select username, descriptionUser, city, postalCode, email, photo, id_user from user where id_user = ?";
  const queryAvg =
    "select AVG(assessment) as point from purchase where product = ANY(select id_product from product where seller = ?)";

  const [user] = await pool.query(query, userId);
  const [avg] = await pool.query(queryAvg, userId);
  return [user, avg];
}

async function changePassword(password, userId) {
  const pool = await database.getPool();

  const query = "update user set userPassword = ? where id_user = ?";
  const [newPassword] = await pool.query(query, [password, userId]);
  return newPassword;
}

async function forgetPass(password, email) {
  const pool = await database.getPool();
  const query = "update user set userPassword = ? where email = ?";
  const [newPassword] = await pool.query(query, [password, email]);
  return newPassword;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function createUser(username, email, userPassword) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into user( username, email, userPassword) values(?,?, ?)";
  const [createUser] = await pool.query(insertQuery, [
    username,
    email,
    userPassword,
  ]);
  return createUser.isertId;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function login(email) {
  const pool = await database.getPool();
  const query = "select * from user where email= ?";
  const [user] = await pool.query(query, email);
  return user;
}

module.exports = {
  getUser,
  selectUser,
  changePassword,
  createUser,
  login,
  forgetPass,
};
