const database = require("../infraestructure/db.js");

async function getUser() {
  const pool = await database.getPool();
  const query = "select * from user";
  const [users] = await pool.query(query);
  return users;
}

async function selectUser(userId) {
  const pool = await database.getPool();
  const query = "select * from user where id_user = ?";
  const [user] = await pool.query(query, userId);
  return user;
}

async function changePassword(password, userId) {
  const pool = await database.getPool();

  const query = "update user set userPassword = ? where id_user = ?";
  const [newPassword] = await pool.query(query, [password, userId]);
  return newPassword;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function createUser(username, email, userPassword) {
  const pool = await database.getPool();
  const insertQuery =
    "insert into user(username, email, userPassword) values(?,?,?)";
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
};
