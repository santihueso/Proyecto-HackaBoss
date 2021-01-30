const { usePurchase } = require("../repository/index");

async function showFavoritesBooks(req, res) {
  try {
    const userId = +req.params.userId;
    const favorites = await usePurchase.favoriteUserBooks(userId);
    if (!favorites || favorites.length === 0) {
      const error = new Error("No tienes libros en favoritos.");
      error.status = 404;
      throw error;
    }
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
    const purchase = await usePurchase.purchaseUserBooks(userId);
    if (!purchase || purchase.length === 0) {
      const error = new Error("No has comprado libros aún.");
      error.status = 404;
      throw error;
    }
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
    const sell = await usePurchase.sellUserBooks(userId);
    if (!sell || sell.length === 0) {
      const error = new Error("No tienes libros en venta.");
      error.status = 404;
      throw error;
    }
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
    const offers = await usePurchase.offersUserBooks(userId);
    if (!offers || offers.length === 0) {
      const error = new Error("No tienes notificaciones de tus libros.");
      error.status = 404;
      throw error;
    }
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
