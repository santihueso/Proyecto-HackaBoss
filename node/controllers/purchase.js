const { purchase, book } = require("../repository/index.js");
const messages = require("../messages/sendMessage.js");
const buy = "You have made the purchase correctly.";
const joi = require("joi");

async function getReserver(req, res) {
  try {
    const book = req.params.bookId;
    const buyer = req.params.userId;
    const ifExist = await purchase.findBook(book);
    const existBook = await purchase.ifReservedOrBuyed(book);
    const ifReserved = existBook.find((e) => e.reservation === 1);
    const ifBuyed = existBook.find((e) => e.purchase === 1);

    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    } else if (existBook.length > 0) {
      if (ifReserved) {
        throw new Error("El libro está reservado.");
      } else if (ifBuyed) {
        throw new Error("El libro fue vendido.");
      } else {
        const getBook = await purchase.reserverBook(book, 1, buyer);
        res.status(200);
        res.send("El libro ha sido reservado.");
      }
    } else {
      const getBook = await purchase.reserverBook(book, 1, buyer);
      res.status(200);
      res.send("El libro ha sido reservado.");
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
    const bookId = req.params.bookId;
    const buyer = +req.params.userId;
    const dateBuy = new Date();
    const ifExist = await purchase.findBook(bookId);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    }
    const ifHaveReserved = await purchase.findUserIfReserverBook(bookId);
    if (ifHaveReserved[0].buyer !== buyer) {
      throw new Error("El libro está reservado por otro usuario.");
    } else {
      const buyWithReserve = await purchase.updateWeReserve(1, buyer, dateBuy);
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
    const book = +req.params.bookId;
    const buyer = req.params.userId;
    const date = new Date();
    const ifExist = await purchase.findBook(book);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    } else if (ifExist.length > 0) {
      const ifSelled = ifExist.find((e) => e.purchase === 1);
      const ifReserved = ifExist.find((e) => e.reservation === 1);

      if (ifSelled || ifReserved) {
        throw new Error("El libro está reservado o fue vendido.");
      } else {
        const buyBookInTable = await purchase.buyBook(book, 1, buyer, date);
        await messages.send(req, res, buy);
        res.status(200);
        res.send("El libro ha sido comprado correctamente.");
      }
    } else {
      const buyBook = await purchase.buyBook(book, 1, buyer, date);
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
    const book = req.params.bookId;
    const buyer = req.params.userId;

    const ifExist = await purchase.findBook(book);
    const findUserWithFavorite = await ifExist.find(
      (e) => e.buyer === +buyer && e.favorite === 1
    );
    console.log(ifExist);
    if (!ifExist || ifExist.length === 0) {
      const error = new Error("No se encuentra el libro.");
      error.status = 404;
      throw error;
    } else if (ifExist.length > 0) {
      const ifSelled = ifExist.find((e) => e.purchase === 1);
      if (ifSelled) {
        throw new Error("El libro no está disponible.");
      } else if (findUserWithFavorite) {
        throw new Error("Ya está en tu lista de favoritos");
      } else {
        const favoriteBook = await purchase.favorites(book, 1, buyer);
        res.status(200);
        res.send("El libro se ha añadido a tus favoritos.");
      }
    } else {
      const favoriteBook = await purchase.favorites(book, 1, buyer);
      res.status(200);
      res.send("El libro se ha añadido a tus favoritos.");
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
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    //Arreglar con token
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
    const userId = req.params.userId;
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
    const bookId = req.params.bookId;
    const buyer = +req.params.userId;

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

module.exports = {
  getReserver,
  getBuyBookWithReserve,
  getFavoriteBook,
  buyBookWithoutReserve,
  deleteBookReserved,
  deleteFavorite,
  assessment,
};
