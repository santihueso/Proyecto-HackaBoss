const { reservation } = require("../repository/index.js");
const jwt = require("jsonwebtoken");

async function getReservedBook(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const reservedBook = await reservation.getReservedBooks(userId);

    res.send(reservedBook);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = { getReservedBook };
