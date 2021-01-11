require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { PORT, JWT } = process.env;
const userConstroller = require("./controllers/userControllers.js");
const bodyparser = require("body-parser");
const bookController = require("./controllers/bookControllers.js");

app.use(bodyparser.urlencoded({ extended: true })); // middleware

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
app.post("/user/newBook", bookController.newBook);
app.put("/user/:userId/editUser", userConstroller.updateUser);
app.delete("/user/book/:bookId/delete", bookController.deleteBook);
app.put("/user/:idUser/book/:idBook/editBook", bookController.editBook);

app.get("/", userConstroller.getUser);
app.get("/user/:userId/book/:bookId", bookController.book);
app.get("/login/user/:userId", userConstroller.getUserSelect);
app.post("/login", userConstroller.login);
app.post("/registro", userConstroller.registro);
app.get("/validar", validate, (req, res) => {
  res.send("funciona");
});

app.get("/book", bookController.getBook);

app.listen(PORT, () => console.log(PORT));
