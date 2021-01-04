const database = require("../infraestructure/db.js");

async function getUser() {
  const pool = await database.getPool();
  const query = "select * from user";
  const [users] = await pool.query(query);
  return users;
}

async function changePassword(password, userId) {
  const pool = await database.getPool();

  const query = "update user set userPassword = ? where id_user = ?";
  const [newPassword] = await pool.query(query, [password, userId]);
  return newPassword;
}

module.exports = {
  getUser,

  changePassword,
};
