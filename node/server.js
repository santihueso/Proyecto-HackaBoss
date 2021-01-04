require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");
const { PORT, JWT } = process.env;
const userController = require("./controllers/userController.js");
const bookController = require("./controllers/bookController.js");
const seekerController = require("./controllers/seeker.js");
const compraController = require("./controllers/compra.js");
const profileController = require("./controllers/profile.js");
const reservedController = require("./controllers/reservation.js");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

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
  multer({ storage, dest: path.join(__dirname, "public/uploads") }).single(
    "image"
  )
);
app.get("/:userId/uploads", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});
app.get("/login/:userId/reservation/books", reservedController.getReservedBook);
app.post("/:userId/uploads", userController.upImgUser);
app.get("/beginning/lastBooks", bookController.showLastBook);
/*Buscardor*/
app.post("/beginning/seeker/category", seekerController.findCategory);
app.post("/beginning/seeker/tittle", seekerController.findName);
app.post("/beginning/seeker/cp", seekerController.findCP);
app.post("/beginning/seeker/author", seekerController.findAuthor);
/*dentro de categoria*/
app.get("/beginning/category/:bookID", bookController.selectBook);
/*Reserva, compra y favorito*/
app.post(
  "/login/:userId/book/:bookId/reservation/buy",
  compraController.getBuyBookWithReserve
);
app.post(
  "/login/:userId/book/:bookId/reservation",
  compraController.getReserver
);

app.post(
  "/login/:userId/book/:bookId/buy",
  compraController.buyBookWithoutReserve
);
app.post(
  "/login/:userId/book/:bookId/favorite",
  compraController.getFavoriteBook
);

app.get(
  "/login/category/language/book/porfile/:userId",
  profileController.profileFromOutside
);

// app.get("/", userController.getUsers);
app.post("/:userId/forgetPassword", userController.newPassword);

app.post("/login", userController.login);

app.post("/register", userController.register);

app.listen(PORT, () => console.log(PORT));
