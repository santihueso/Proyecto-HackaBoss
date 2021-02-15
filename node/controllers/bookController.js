const { book, user } = require("../repository/index.js");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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

    if (!selectId || selectId.length === 0) {
      const error = new Error("El libro no se encuentra");
      error.status = 404;
      throw error;
    } else {
      res.status(200);
      res.send(selectId);
    }
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
    if (!books || books.length === 0) {
      const error = new Error("No tenemos esa categoría.");
      error.status = 404;
      throw error;
    }

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

//-----------------------Nuevo Libro---------------------------------------------------------------------------------------------------------------

async function newBook(req, res) {
  try {
    const publicationDate = new Date();
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const seller = decode.id;
    const photos = req.files;
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
      category: Joi.string().required(),
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

    res.status(200);
    res.send("El libro se ha publicado.");
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
    const idBook = req.params.bookId;
    const ifExist = await book.selectBook(idBook);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("El libro no existe");
      error.status = 404;
      throw error;
    }
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const idUser = decode.id;

    let change;
    let photoFront;
    let photoBack;

    if (req.files.length > 0) {
      change = req.files;
      if (change[0]) {
        photoFront = change[0].filename;
      }
      if (change[1]) {
        photoBack = change[1].filename;
      } else {
        photoBack = req.body.change;
      }
    } else {
      photoFront = req.body.change[0];
      photoBack = req.body.change[1];
    }

    const {
      productName,
      descriptionProduct,
      price,
      bookLanguage,
      author,
      category,
    } = req.body;

    const schema = Joi.object({
      productName: Joi.string().required(),
      descriptionProduct: Joi.string(),
      change: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
      ),
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

    res.status(200);
    res.send("El libro se ha actualizado.");
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
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const ifExist = await book.selectBook(bookId);
    const ifExistInPurchase = await book.existInPurchase(bookId);

    if (!ifExist || ifExist.length === 0) {
      const error = new Error("El libro no existe");
      error.status = 404;
      throw error;
    }
    const deleteBook = await book.deleteBook(userId, bookId);

    res.status(200);
    res.send("El libro se ha eliminado.");
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}
async function soldBooks(req, res) {
  try {
    const userId = req.params.userId;

    const books = await book.soldBook(userId);

    res.send(books);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

async function soldBooksWithToken(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const idUser = decode.id;
    const books = await book.soldBook(idUser);

    res.send(books);
    res.status(200);
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
  newBook,
  editBook,
  deleteBook,
  soldBooks,
  soldBooksWithToken,
};
