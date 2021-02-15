const { purchase, book } = require("../repository/index.js");
const messages = require("../messages/sendMessage.js");
const buy = "You have made the purchase correctly.";
const joi = require("joi");
const jwt = require("jsonwebtoken");

async function getReserver(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const book = req.params.bookId;
    const buyer = decode.id;
    const ifExist = await purchase.findBook(book);
    const existBook = await purchase.ifReservedOrBuyed(book);
    const ifReserved = existBook.find((e) => e.reservation === 1);
    const ifBuyed = existBook.find((e) => e.purchase === 1);
    const createDate = new Date();

    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    } else {
      if (ifExist[0].seller === buyer) {
        const error = new Error("El libro es tuyo.");
        error.status = 406;
        throw error;
      } else if (existBook.length > 0) {
        if (ifExist[0].seller === buyer) {
          const error = new Error("El libro es tuyo.");
          error.status = 406;
          throw error;
        }
        if (ifReserved) {
          const error = new Error("El libro está reservado.");
          error.status = 404;
          throw error;
        } else if (ifBuyed) {
          const error = new Error("El libro fue vendido.");
          error.status = 404;
          throw error;
        } else {
          const getBook = await purchase.reserverBook(
            book,
            1,
            buyer,
            createDate
          );
          res.status(200);
          res.send("El libro ha sido reservado.");
        }
      } else {
        const getBook = await purchase.reserverBook(book, 1, buyer, createDate);
        res.status(200);
        res.send("El libro ha sido reservado.");
      }
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

async function getBuyBookWithReserve(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const bookId = req.params.bookId;
    const buyer = decode.id;
    const dateBuy = new Date();
    const ifExist = await purchase.findBook(bookId);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    }
    const ifHaveReserved = await purchase.findUserIfReserverBook(bookId);
    if (!ifHaveReserved || ifHaveReserved.length === 0) {
      throw new Error("No reservaste el libro.");
    } else if (ifHaveReserved[0].buyer !== buyer) {
      const error = new Error("El libro está reservado por otro usuario.");
      error.status = 404;
      throw error;
    } else {
      const buyWithReserve = await purchase.updateWeReserve(dateBuy, bookId);
      await messages.send(req, res, buy);
      res.status(200);
      res.send("El libro ha sido comprado correctamente.");
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

async function buyBookWithoutReserve(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const book = +req.params.bookId;
    const buyer = decode.id;
    const date = new Date();
    const ifExist = await purchase.findBook(book);

    const existBook = await purchase.ifReservedOrBuyed(book);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    } else if (ifExist.length > 0) {
      if (ifExist[0].seller === buyer) {
        const error = new Error("El libro es tuyo.");
        error.status = 406;
        throw error;
      }
      const ifSelled = existBook.find((e) => e.purchase === 1);
      const ifReserved = existBook.find((e) => e.reservation === 1);

      if (ifSelled || ifReserved) {
        const error = new Error("El libro está reservado.");
        error.status = 404;
        throw error;
      } else {
        const buyBookInTable = await purchase.buyBook(book, 1, buyer, date);
        await messages.send(req, res, buy);
        res.status(200);
        res.send("El libro ha sido comprado correctamente.");
      }
    } else {
      const buyBook = await purchase.buyBook(book, 1, buyer, date, 1, book);
      await messages.send(req, res, buy);
      res.status(200);
      res.send("El libro ha sido comprado correctamente.");
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

async function getFavoriteBook(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const book = req.params.bookId;
    const buyer = decode.id;

    const ifExist = await purchase.findBook(book);
    const existBookFavorite = await purchase.ifYouHaveFavoriteBookYet(book);
    const existBookSelled = await purchase.ifReservedOrBuyed(book);
    const selled = existBookSelled.find((e) => e.purchase === 1);

    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    } else {
      if (ifExist[0].seller === buyer) {
        const error = new Error("El libro es tuyo.");
        error.status = 406;
        throw error;
      } else if (existBookSelled.length > 0 && selled) {
        throw new Error("El libro se ha vendido.");
      } else if (
        existBookFavorite.length > 0 &&
        existBookFavorite[0].buyer === buyer
      ) {
        const error = new Error("El libro ya está en tu lista de favoritos");
        error.status = 406;
        throw error;
      } else {
        const getFavorite = await purchase.favorites(book, 1, buyer);
        res.status = 200;
        res.send("El libro ha sido añadido a tu lista de favoritos.");
      }
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

async function deleteBookReserved(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const bookId = req.params.bookId;
    const userId = decode.id;

    const ifExist = await book.selectBook(bookId);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("El libro no se encuentra.");
      error.status = 404;
      throw error;
    }
    const deleteBook = await purchase.deleteReservation(bookId, userId);
    res.status(200);
    res.send("El libro se ha eliminado de tus reservas.");
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function deleteFavorite(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const bookId = req.params.bookId;
    const ifExist = await book.selectBook(bookId);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("El libro no se encuentra.");
      error.status = 404;
      throw error;
    }
    const deleteBook = await purchase.deleteFavorite(bookId, userId);
    res.status(200);
    res.send("El libro se ha eliminado de tus favoritos");
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function assessment(req, res) {
  try {
    const schema = joi.object({
      assessment: joi.number(),
      opinion: joi.string(),
    });
    await schema.validateAsync(req.body);
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const bookId = req.params.bookId;
    const buyer = decode.id;

    const { assessment, opinion } = req.body;
    const existBook = await purchase.ifBuyed(bookId);
    if (!existBook || existBook.length === 0) {
      const error = new Error("El libro no se ha encontrado.");
      error.status = 404;
      throw error;
    }

    const ifBuyedBook = existBook.find((e) => e.purchase === 1);

    if (existBook.length > 0) {
      if (ifBuyedBook) {
        if (ifBuyedBook.buyer === buyer) {
          const getBook = await purchase.ratingPurchase(
            assessment,
            opinion,
            bookId,
            buyer
          );
          res.status(200);
          res.send("Has publicado tu opinión del libro.");
        } else {
          throw new Error("El libro no es suyo.");
        }
      } else {
        throw new Error("El libro no ha sido comprado.");
      }
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

async function deleteSellerRes(req, res) {
  try {
    const book = req.params.bookId;
    const remove = await purchase.deleteSellerReserved(book);

    if (!remove || remove.length === 0) {
      const error = new Error("No se encuentra el libro");
      error.status = 404;
      throw error;
    }
    res.send("Se ha eliminado la reserva");
    res.status(200);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  getReserver,
  getBuyBookWithReserve,
  getFavoriteBook,
  buyBookWithoutReserve,
  deleteBookReserved,
  deleteFavorite,
  assessment,
  deleteSellerRes,
};
