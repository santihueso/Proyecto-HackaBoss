const reserveRespository = require("../repository/reservation.js");

async function getReservedBook(req, res) {
  try {
    const userId = req.params.userId;
    const reservedBook = await reserveRespository.getReservedBooks(userId);
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
