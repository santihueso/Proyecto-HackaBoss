const database = require("../infraestructure/db.js");
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getUser() {
  const pool = await database.getPool();
  const query = "select * from user";
  const [users] = await pool.query(query);
  return users;
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

async function logearse(email) {
  const pool = await database.getPool();
  const query = "select * from user where email= ?";
  const [user] = await pool.query(query, email);
  return user;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function selectUser(userId) {
  const pool = await database.getPool();
  const query = "select * from user where id_user = ?";
  const [user] = await pool.query(query, userId);
  return user;
}

//--------Editar Usuario-------------------------------------------------------------------------------------------------------------------------------------------------------

async function updateUser(username, photo, city, postalCode, id_user) {
  const pool = await database.getPool();
  const insertQuery =
    "update user set username=?, photo=?, city=?, postalCode=? where id_user=?";
  const [editUser] = await pool.query(insertQuery, [
    username,
    photo,
    city,
    postalCode,
    id_user,
  ]);
  return editUser;
}

//----Perfil vista Usuario----------------------------------------------------------------------------------------------------------------------------------------------------------------

async function showProfileFromUser(userId) {
  const pool = await database.getPool();
  const query =
    "select u.username, u.photo, u.descriptionUser, p.favorite, p.purchase as tittle from user as u inner join product as p on u.id_user = p.seller and p.seller = ?";
  const [showProfile] = await pool.query(query, userId);
  return showProfile;
}

//-----valoraciones-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  getUser,
  createUser,
  logearse,
  selectUser,
  updateUser,
  showProfileFromUser,
};
