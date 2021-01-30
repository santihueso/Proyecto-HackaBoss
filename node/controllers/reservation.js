const { reservation } = require("../repository/index.js");

async function getReservedBook(req, res) {
  try {
    const userId = req.params.userId;
    const reservedBook = await reservation.getReservedBooks(userId);
    if (!reservedBook || reservedBook.length === 0) {
      const error = new Error("No tienes libros reservados.");
      error.status = 404;
      throw error;
    }
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
