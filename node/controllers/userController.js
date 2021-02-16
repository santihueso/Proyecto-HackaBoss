const { user } = require("../repository/index.js");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const sendMenssage = require("../messages/sendMessage.js");
const jwt = require("jsonwebtoken");
const success = "You have successfully registered!";

async function getUsers(req, res) {
  try {
    const users = await user.getUser();
    if (users.length < 1) {
      const error = new Error("No hay usuarios.");
      error.status = 404;
      throw error;
    }
    res.send(users);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function getUserSelect(req, res) {
  try {
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const selectUser = await user.selectUser(userId);
    if (!selectUser || selectUser.length === 0) {
      const error = new Error("No existe el usuario.");
      error.status = 404;
      throw error;
    }
    res.send(selectUser);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function newPassword(req, res) {
  try {
    const schema = Joi.object({
      newPassword: Joi.string().min(8).required(),
      passwordAgain: Joi.string().required().valid(Joi.ref("newPassword")),
    });
    await schema.validateAsync(req.body);
    const { newPassword } = req.body;
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const change = await user.changePassword(passwordHash, userId);
    res.status(200);
    res.send("Se ha cambiado la contraseña correctamente.");
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function register(req, res) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      hashPassword: Joi.ref("password"),
    });
    await schema.validateAsync(req.body);
    const { username, email, password } = req.body;
    const userSelect = await user.login(email);

    if (userSelect.length > 0) {
      const error = new Error("El email ya existe.");
      error.status = 400;
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await user.createUser(username, email, hashPassword);
    await sendMenssage.send(req, res, success);
    res.send(newUser);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function login(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    await schema.validateAsync(req.body);
    const { email, password } = req.body;
    const userSelect = await user.login(email);

    if (!userSelect || userSelect.length === 0) {
      const error = new Error("Datos equivocados.");
      error.status = 401;
      throw error;
    }
    const contraseñaValidar = await bcrypt.compare(
      password,
      userSelect[0].userPassword
    );
    if (!contraseñaValidar || contraseñaValidar.length === 0) {
      const error = new Error("Datos equivocados.");
      error.status = 401;
      throw error;
    }

    const tokePayload = {
      id: userSelect[0].id_user,
      username: userSelect[0].username,
    };
    const token = jwt.sign(tokePayload, process.env.JWT, { expiresIn: "30d" });
    res.send({ token: token });
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
  next();
}

function generatePass() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pass = "";
  for (let i = 0; i < 9; i++) {
    pass += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return pass;
}

async function forgetPassUser(req, res) {
  try {
    const { email } = req.body;
    const schema = Joi.object({
      email: Joi.string().email(),
    });
    await schema.validateAsync(req.body);
    const userSelect = await user.login(email);
    if (!userSelect || userSelect.length === 0) {
      const error = new Error("No existe el email");
      error.status = 404;
      throw error;
    }

    const newPass = generatePass();
    const hashPassword = await bcrypt.hash(newPass, 10);
    const change = await user.forgetPass(hashPassword, email);
    if (!change || change.length === 0) {
      const error = new Error("No tienes acceso");
      error.status = 400;
      throw error;
    }
    await sendMenssage.send(req, res, `La nueva contraseña es : ${newPass}`);
    res.send("Le hemos enviado un mensaje a su correo");
    res.status(200);
    console.log(newPass);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  getUsers,
  getUserSelect,
  newPassword,
  login,
  forgetPassUser,
  register,
};
