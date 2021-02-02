require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();
const morgan = require("morgan");
const { validate, notFound } = require("./middleware/middlewares.js");
const fs = require("fs");
const { PORT } = process.env;
const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
const {
  userPurchase,
  userController,
  seeker,
  reservation,
  purchase,
  profile,
  category,
  book,
} = require("./controllers/index.js");

app.use(express.static("public"));

const img = multer({
  dest: path.join(__dirname, "/public/uploads"),
});

app.use(express.json({ type: ["aplication/json", "text/plain"] }));

app.use(cors());

app.use(morgan("combined", { immediate: true, stream: accessLogStream }));

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

/*Muestra los libros reservados de un usuario */
app.get("/login/reservation/books", validate, reservation.getReservedBook);
/*Muestra los últimos libros */
app.get("/beginning/lastBooks", book.showLastBook);
//Todas las categorias
app.get("/beginning/categories", book.selectAllCategories);
/*Buscardor*/
app.post("/beginning/seeker/category", seeker.findCategory);
app.post("/beginning/seeker/title", seeker.findName);
app.post("/beginning/seeker/cp", seeker.findCP);
app.post("/beginning/seeker/author", seeker.findAuthor);
/*dentro de categoria, buscar los datos del libro*/
app.get("/beginning/category/:bookID", book.selectBook);
/*Reserva con reserva*/
app.get(
  "/login/user/book/:bookId/reservation/buy",
  validate,
  purchase.getBuyBookWithReserve
);
/*Eliminar reserva*/
app.delete(
  "/login/user/book/:bookId/reservation/delete",
  validate,
  purchase.deleteBookReserved
);
/*reservar*/
app.get("/login/user/book/:bookId/reservation", validate, purchase.getReserver);
/*comprar directamente*/
app.get(
  "/login/user/book/:bookId/buy",
  validate,
  purchase.buyBookWithoutReserve
);
/*eliminar favorito*/
app.delete(
  "/login/user/book/:bookId/favorite/delete",
  validate,
  purchase.deleteFavorite
);
/*guardar como favorito*/
app.get(
  "/login/user/book/:bookId/favorite",
  validate,
  purchase.getFavoriteBook
);
// hacer calificacion compra
app.put(
  "/login/user/:userId/book/:bookId/assessment",
  validate,
  purchase.assessment
);

app.get(
  "/login/category/book/porfile/:userId",

  profile.profileFromOutside
);
/*los datos del usuario*/
app.get(
  "/login/user/profile/favorites",
  validate,
  userPurchase.showFavoritesBooks
);
app.get(
  "/login/user/profile/purchase",
  validate,
  userPurchase.showPurchaseBooks
);

app.get("/login/user/profile/toSell", validate, userPurchase.showMyBooks);
app.get("/login/user/profile/offers", validate, userPurchase.showMyoffers);
app.get("/login/user/profile", validate, userController.getUserSelect);

/*cambio de contraseña*/
app.put("/user/forgetPassword", validate, userController.newPassword);

// datos generales del usuario
app.get("/api/user", userController.getUsers);

//register y login
app.post("/signin", userController.register);
app.post("/login", userController.login);

//libros
app.post("/login/user/newBook", validate, img.array("photos", 2), book.newBook);
app.delete("/login/user/book/:bookId/delete", validate, book.deleteBook);
app.put(
  "/login/user/book/:bookId/editBook",
  validate,
  img.array("change", 2),
  book.editBook
);

//usuario
app.put("/user/editUser", validate, img.single("photo"), profile.updateUser);

//categorias

app.get("/category/:categoryId", category.goToCategory);

app.get("*", notFound);

app.listen(PORT, () => console.log(PORT));
