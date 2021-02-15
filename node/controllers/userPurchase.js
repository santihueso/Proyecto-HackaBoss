const { usePurchase } = require("../repository/index");
const jwt = require("jsonwebtoken");
async function showFavoritesBooks(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    const favorites = await usePurchase.favoriteUserBooks(userId, num1, num2);

    res.send(favorites);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function showPurchaseBooks(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    const purchase = await usePurchase.purchaseUserBooks(userId, num1, num2);

    res.send(purchase);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function showMyBooks(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    const sell = await usePurchase.sellUserBooks(userId, num1, num2);

    res.send(sell);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function showMyoffers(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    const offers = await usePurchase.offersUserBooks(userId, num1, num2);

    res.send(offers);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function showFavourites(req, res) {
  try {
    const idBook = req.params.bookId;
    const count = await usePurchase.favouritesBooksUser(idBook);

    res.send(count);
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
  showFavoritesBooks,
  showPurchaseBooks,
  showMyBooks,
  showMyoffers,
  showFavourites,
};
