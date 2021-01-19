const userPurchaseRepository = require("../repository/userPurchase.js");

async function showFavoritesBooks(req, res) {
  try {
    const userId = +req.params.userId;
    const favorites = await userPurchaseRepository.favoriteUserBooks(userId);
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
    const userId = +req.params.userId;
    const purchase = await userPurchaseRepository.purchaseUserBooks(userId);
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
    const userId = +req.params.userId;
    const sell = await userPurchaseRepository.sellUserBooks(userId);
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
    const userId = +req.params.userId;
    const offers = await userPurchaseRepository.offersUserBooks(userId);
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
