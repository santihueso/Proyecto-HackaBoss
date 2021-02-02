const { usePurchase } = require("../repository/index");
const jwt = require("jsonwebtoken");
async function showFavoritesBooks(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const favorites = await usePurchase.favoriteUserBooks(userId);

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
    const purchase = await usePurchase.purchaseUserBooks(userId);

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
    const sell = await usePurchase.sellUserBooks(userId);

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
    const offers = await usePurchase.offersUserBooks(userId);

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

module.exports = {
  showFavoritesBooks,
  showPurchaseBooks,
  showMyBooks,
  showMyoffers,
};
