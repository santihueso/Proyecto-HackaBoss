const { book } = require("../repository/index.js");

async function showLastBook(req, res) {
  try {
    const books = await book.lastBooks();
    res.send(books);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function selectBook(req, res) {
  try {
    const bookID = req.params.bookID;
    const selectId = await book.selectBook(bookID);
    res.send(selectId);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function selectAllCategories(req, res) {
  try {
    const books = await book.category();
    res.send(books);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = { showLastBook, selectBook, selectAllCategories };
