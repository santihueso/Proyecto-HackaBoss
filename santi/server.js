require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { PORT, JWT } = process.env;
const userConstroller = require("./controllers/userControllers.js");
const bodyparser = require("body-parser");
const bookController = require("./controllers/bookControllers.js");

app.use(bodyparser.urlencoded({ extended: true })); // middleware

//-------tokens-------------------------------------------------------
function validate(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodeToken = jwt.verify(token, JWT);
    const { id, username } = decodeToken;
    req.auth = { id, username };
    req.auth = decodeToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.send("token erróneo");
  }
}

//------imagenes----------------------------------------------------
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  multer({
    storage,
    dest: path.join(__dirname, "/uploads"),
  }).single("photo")
);

//--- rutas-----------------------------------------------------------

app.get("/", userConstroller.getUser);
app.get("/login/user/:userId", validate, userConstroller.getUserSelect);
//----------------------------------------------------------------
app.post("/register", userConstroller.register);
app.post("/login", userConstroller.login);
app.get("/validar", validate, (req, res) => {
  res.send("funciona");
});
//-----------------------------------------------------------------
app.get("/user/:userId", validate, userConstroller.profileUser);
app.put(
  "user/:userId/book/:idBook/editBook",
  validate,
  bookController.editBook
);
app.put("/user/:userId/editUser", validate, userConstroller.updateUser);
app.post("/user/newBook", bookController.newBook);
app.delete("/user/book/:bookId/delete", bookController.deleteBook);
app.put("/user/book/:bookId/assessment", bookController.assessment);

app.get("/user/:userId/book/:bookId", validate, bookController.book);

app.get("/book", bookController.getBook);

app.listen(PORT, () => console.log(PORT));
