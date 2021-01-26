const database = require("../infraestructure/db.js");

async function showProfileFromOutside(userId) {
  const pool = await database.getPool();
  const query =
    " select u.username, u.descriptionUser, u.photo, p.author, p.bookLanguage, p.price, p.productName as tittle from user as u inner join product as p on u.id_user = p.seller and p.seller = ?";
  const [forSell] = await pool.query(query, userId);
  return forSell;
}

//--------Editar Usuario-------------------------------------------------------------------------------------------------------------------------------------------------------

async function updateUser(
  username,
  descriptionUser,
  city,
  postalCode,
  photo,
  id_user
) {
  const pool = await database.getPool();
  const insertQuery =
    "UPDATE user SET username=?, descriptionUser=?, city=?, postalCode=?, photo=? WHERE id_user=?";
  const [editUser] = await pool.query(insertQuery, [
    username,
    descriptionUser,
    city,
    postalCode,
    photo,
    id_user,
  ]);
  return editUser;
}

//----Perfil vista Usuario----------------------------------------------------------------------------------------------------------------------------------------------------------------

async function showProfileFromUser(userId) {
  const pool = await database.getPool();
  const query =
    "SELECT u.username, u.photo, u.descriptionUser, p.favorite, p.purchase AS tittle from user as u inner join product as p on u.id_user =? p.buyer = ?";
  const [showProfile] = await pool.query(query, userId);
  return showProfile;
}

module.exports = { showProfileFromOutside, updateUser, showProfileFromUser };
