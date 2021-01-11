require("dotenv").config();
const Joi = require("joi");
const { func, string, number } = require("joi");
const bookRepository = require("../repository/book.js");

//------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------

async function book(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const selectUserBook = await bookRepository.selectUser(userId, bookId);
    res.send(selectUserBook);
  } catch (error) {
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
    const schema = Joi.object({
      productName: Joi.string().required(),
      photoFront: Joi.string(),
      photoBack: Joi.string(),
      descriptionProduct: Joi.string(),
      publicationDate: Joi.date().required(),
      price: Joi.number().positive().precision(2).required(),
      bookLanguage: Joi.string().required(),
      seller: Joi.number().required(),
      author: Joi.number().required(),
      category: Joi.number().required(),
      postal_code: Joi.number(),
    });
    await schema.validateAsync(req.body);
    const {
      productName,
      photoFront,
      photoBack,
      descriptionProduct,
      publicationDate,
      price,
      bookLanguage,
      seller,
      author,
      category,
      postal_code,
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
      category,
      postal_code
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
    const idBook = req.params.id_product;
    const idUser = req.params.id_user;
    const {
      productName,
      photoFront,
      photoBack,
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
      publicationDate: Joi.date().required(),
      price: Joi.number().positive().precision(2).required(),
      bookLanguage: Joi.string().required(),
      author: Joi.number().required(),
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
    const bookId = req.params.id_product;
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

//--------------------------valoraciones------------------------------------------------------------------------------------------------------------------------------------------

module.exports = { getBook, book, newBook, editBook, deleteBook };
