const bookRepository = require("../repository/book.js");
const Joi = require("joi");
//const { func, string, number } = require("joi");

async function showLastBook(req, res) {
  try {
    const books = await bookRepository.lastBooks();
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
    const selectId = await bookRepository.selectBook(bookID);
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
    const books = await bookRepository.category();
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
    const book = await bookRepository.getBook();
    res.send(book);
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
    const { photoBack, photoFront } = req.file.path;
    const schema = Joi.object({
      productName: Joi.string().required(),
      photoFront: Joi.string(),
      photoBack: Joi.string(),
      descriptionProduct: Joi.string(),
      publicationDate: Joi.date().required(),
      price: Joi.number().positive().precision(2).required(),
      bookLanguage: Joi.string().required(),
      seller: Joi.number().required(),
      author: Joi.string().required(),
      category: Joi.number().required(),
    });
    await schema.validateAsync(req.body);
    const {
      productName,
      descriptionProduct,
      publicationDate,
      price,
      bookLanguage,
      seller,
      author,
      category,
    } = req.body;
    const newBook = await bookRepository.createBook(
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
    res.send({ error: err.message });
  }
}

//-------------------------edit book----------------------------------------------------------------------------------------------------------------

async function editBook(req, res) {
  try {
    //recojo datos
    const idBook = req.params.idBook;
    const idUser = req.params.idUser;
    const { photoBack, photoFront } = req.file.path;
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
      photoFront: Joi.string(),
      photoBack: Joi.string(),
      descriptionProduct: Joi.string(),
      price: Joi.number().positive().precision(2).required(),
      bookLanguage: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.number().required(),
    });
    await schema.validateAsync({
      productName,
      photoFront,
      photoBack,
      descriptionProduct,
      price,
      bookLanguage,
      author,
      category,
    });

    const updateBook = await bookRepository.editBook(
      productName,
      photoFront,
      photoBack,
      descriptionProduct,
      price,
      bookLanguage,
      author,
      category,
      idBook,
      idUser
    );
    res.send(updateBook);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//------------------------------Borrar Libro--------------------------------------------------------------------------------------------------------------------------

async function deleteBook(req, res) {
  try {
    const bookId = req.params.bookId;
    const deleteBook = await bookRepository.deleteBook(bookId);
    res.send(deleteBook);
  } catch (error) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
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
