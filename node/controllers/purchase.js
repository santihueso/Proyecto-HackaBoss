require("dotenv").config();
const compraRepository = require("../repository/purchase.js");
const { MAILGUN_KEY, DOMAIN } = process.env;
const mailgun = require("mailgun-js");

async function getReserver(req, res) {
  try {
    const book = req.params.bookId;
    const buyer = req.params.userId;
    const existBook = await compraRepository.ifReservedOrBuyed(book);
    const ifReserved = existBook.find((e) => e.reservation === 1);
    const ifBuyed = existBook.find((e) => e.purchase === 1);

    if (existBook.length > 0) {
      if (ifReserved) {
        throw new Error("El libro está reservado.");
      } else if (ifBuyed) {
        throw new Error("El libro fue vendido.");
      } else {
        const getBook = await compraRepository.reserverBook(book, 1, buyer);
        res.send(getBook);
      }
    } else {
      const getBook = await compraRepository.reserverBook(book, 1, buyer);
      res.send(getBook);
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
    const ifHaveReserved = await compraRepository.findUserIfReserverBook(
      bookId
    );
    if (ifHaveReserved[0].buyer !== buyer) {
      throw new Error("El libro está reservado por otro usuario.");
    } else {
      const buyWithReserve = await compraRepository.updateWeReserve(
        1,
        buyer,
        dateBuy
      );
      const mg = mailgun({
        apiKey: MAILGUN_KEY,
        domain: DOMAIN,
      });

      const data = {
        from: "sender@gmail.com",
        to: "jeimymiranda@outlook.es",
        subject: "Hola",
        text: "Testing some Mailgun awesomness!",
      };
      await mg.messages().send(data);
      res.send(buyWithReserve);
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
    const ifExist = await compraRepository.findBook(book);

    if (ifExist.length > 0) {
      const ifSelled = ifExist.find((e) => e.purchase === 1);
      const ifReserved = ifExist.find((e) => e.reservation === 1);

      if (ifSelled || ifReserved) {
        throw new Error("El libro fue vendido.");
      } else {
        const buyBookInTable = await compraRepository.buyBook(
          book,
          1,
          buyer,
          date
        );
        const mg = mailgun({
          apiKey: MAILGUN_KEY,
          domain: DOMAIN,
        });

        const data = {
          from: "sender@gmail.com",
          to: "jeimymiranda@outlook.es",
          subject: "Hola",
          text: "Testing some Mailgun awesomness!",
        };
        await mg.messages().send(data);
        res.send(buyBookInTable);
      }
    } else {
      const buyBook = await compraRepository.buyBook(book, 1, buyer, date);
      const mg = mailgun({
        apiKey: MAILGUN_KEY,
        domain: DOMAIN,
      });

      const data = {
        from: "sender@gmail.com",
        to: "jeimymiranda@outlook.es",
        subject: "Hola",
        text: "Testing some Mailgun awesomness!",
      };
      await mg.messages().send(data);
      res.send(buyBook);
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
    const ifExist = await compraRepository.findBook(book);

    if (ifExist.length > 0) {
      const ifNotSelled = ifExist.find((e) => e.purchase === 1);
      if (ifNotSelled) {
        throw new Error("El libro no está disponible.");
      } else {
        const favoriteBook = await compraRepository.favorites(book, 1, buyer);
        res.send(favoriteBook);
      }
    } else {
      const favoriteBook = await compraRepository.favorites(book, 1, buyer);
      res.send(favoriteBook);
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
};
