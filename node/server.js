require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { PORT, JWT } = process.env;
const userController = require("./controllers/userController.js");
const bookController = require("./controllers/bookController.js");
const seekerController = require("./controllers/seeker.js");
const purchaseController = require("./controllers/purchase.js");
const profileController = require("./controllers/profile.js");
const reservedController = require("./controllers/reservation.js");
const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });

const storage = multer.diskStorage({
  destination: path.join(__dirname, "/public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(morgan("combined", { immediate: true, stream: accessLogStream }));
function validate(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodeToken = jwt.verify(token, JWT);
    const { id, nombre } = decodeToken;
    req.auth = { id, nombre };
    req.auth = decodeToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.send("token erróneo");
  }
}

app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "/public/uploads"),
  }).single("photo")
);
/*Muestra los libros reservados de un usuario */
app.get(
  "/login/:userId/reservation/books",
  // validate,
  reservedController.getReservedBook
);
/*Muestra los últimos libros */
app.get("/beginning/lastBooks", bookController.showLastBook);
//Todas las categorias
app.get("/beginning/categories", bookController.selectAllCategories);
/*Buscardor*/
app.post("/beginning/seeker/category", seekerController.findCategory);
app.post("/beginning/seeker/tittle", seekerController.findName);
app.post("/beginning/seeker/cp", seekerController.findCP);
app.post("/beginning/seeker/author", seekerController.findAuthor);
/*dentro de categoria, buscar los datos del libro*/
app.get("/beginning/category/:bookID", bookController.selectBook);
/*Reserva con reserva*/
app.get(
  "/login/user/:userId/book/:bookId/reservation/buy",
  // validate,
  purchaseController.getBuyBookWithReserve
);
/*Eliminar reserva*/
app.get(
  "/login/user/:userId/book/:bookId/reservation/delete",
  // validate,
  purchaseController.deleteBookReserved
);
/*reservar*/
app.get(
  "/login/user/:userId/book/:bookId/reservation",
  // validate,
  purchaseController.getReserver
);
/*comprar directamente*/
app.get(
  "/login/user/:userId/book/:bookId/buy",
  // validate,
  purchaseController.buyBookWithoutReserve
);
/*eliminar favorito*/
app.get(
  "/login/user/:userId/book/:bookId/favorite/delete",
  // validate,
  purchaseController.deleteFavorite
);
/*guardar como favorito*/
app.get(
  "/login/user/:userId/book/:bookId/favorite",
  // validate,
  purchaseController.getFavoriteBook
);
// hacer calificacion compra
app.put(
  "/login/user/:userId/book/:bookId/assessment",
  purchaseController.assessment
);

/*los datos necesario del usuario visto desde fuera*/
// app.get("/login/user/:userId", validate, profileController.profileUser);

app.get(
  "/login/category/language/book/porfile/:userId",
  profileController.profileFromOutside
);

// app.get("/", userController.getUsers);
/*cambio de contraseña*/
app.put("/user/:userId/forgetPassword", userController.newPassword);

// datos generales del usuario
app.get("/api/user", userController.getUsers);
// app.get("/login/user/:userId", validate, userController.getUserSelect);

//register y login
app.post("/singIn", userController.register);
app.post("/login", userController.login);

//libros (revisar iduser newbook,deletebook)
app.post("/login/user/newBook", bookController.newBook);
app.delete("/login/user/book/:bookId/delete", bookController.deleteBook);
app.put(
  "/login/user/:userId/book/:idBook/editBook",
  // validate,
  bookController.editBook
);

//usuario
app.put("/user/:userId/editUser", profileController.updateUser);

app.listen(PORT, () => console.log(PORT));
