const database = require("../infraestructure/db.js");

async function showProfileFromOutside(userId) {
  const pool = await database.getPool();
  const userQuery =
    "select u.username, u.descriptionUser, u.photo, u.id_user from user as u where id_user = ?";
  const [userData] = await pool.query(userQuery, userId);
  const query =
    " select * from product where seller = ? and purchaseState is null";
  const [forSell] = await pool.query(query, userId);
  const queryAvg =
    "select AVG(assessment) as point from purchase where product = ANY(select id_product from product where seller = ?)";
  const [avg] = await pool.query(queryAvg, userId);
  return { user: userData, books: forSell, avg: avg };
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

module.exports = { showProfileFromOutside, updateUser };
