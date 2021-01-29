const { book } = require("../repository/index.js");
const Joi = require("joi");

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

async function getBook(req, res) {
  try {
    const books = await book.getBook();
    res.send(books);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//-----------------------Nuevo Libro---------------------------------------------------------------------------------------------------------------

async function newBook(req, res) {
  try {
    const publicationDate = new Date();
    const seller = req.params.userId;
    const photos = req.files;
    console.log(photos);
    const photoFront = photos[0].filename;
    const photoBack = photos[1].filename;
    const schema = Joi.object({
      productName: Joi.string().required(),
      photos: Joi.string(),
      photos: Joi.string(),
      descriptionProduct: Joi.string(),
      price: Joi.number().positive().precision(2).required(),
      bookLanguage: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.number().required(),
    });
    await schema.validateAsync(req.body);
    const {
      productName,
      descriptionProduct,
      price,
      bookLanguage,
      author,
      category,
    } = req.body;
    const newBook = await book.createBook(
      productName,
      photoFront,
      photoBack,
      descriptionProduct,
      publicationDate,
      price,
      bookLanguage,
      seller,
      author,
      category
    );
    res.send(newBook);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

//-------------------------edit book----------------------------------------------------------------------------------------------------------------

async function editBook(req, res) {
  try {
    //recojo datos
    const idBook = req.params.bookId;
    const idUser = req.params.userId;
    const change = req.files;

    const photoFront = change[0].originalname;
    const photoBack = change[1].originalname;
    const {
      productName,
      descriptionProduct,
      price,
      bookLanguage,
      author,
      category,
    } = req.body;
    //valido datos
    const schema = Joi.object({
      productName: Joi.string().required(),
      change: Joi.string(),
      change: Joi.string(),
      descriptionProduct: Joi.string(),
      price: Joi.number().positive().precision(2).required(),
      bookLanguage: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.number().required(),
    });
    await schema.validateAsync(req.body);

    const updateBook = await book.editBook(
      productName,
      photoFront,
      photoBack,
      descriptionProduct,
      price,
      bookLanguage,
      author,
      category,
      idUser,
      idBook
    );
    res.send(updateBook);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

//------------------------------Borrar Libro--------------------------------------------------------------------------------------------------------------------------

async function deleteBook(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    const deleteBook = await book.deleteBook(userId, bookId);

    res.send(deleteBook);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

module.exports = {
  showLastBook,
  selectBook,
  selectAllCategories,
  getBook,
  newBook,
  editBook,
  deleteBook,
};
