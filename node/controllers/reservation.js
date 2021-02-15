const { reservation } = require("../repository/index.js");
const jwt = require("jsonwebtoken");

async function getReservedBook(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    const reservedBook = await reservation.getReservedBooks(userId, num1, num2);

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
