const jwt = require("jsonwebtoken");
const { JWT } = process.env;

function validate(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodeToken = jwt.verify(token, JWT);
    req.auth = decodeToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.send("token erróneo");
  }
}

function notFound(req, res) {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  console.log(error.message);
  res.status(error.status);
  res.send({ error: error.message });
}

module.exports = { validate, notFound };
