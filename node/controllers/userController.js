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
    const userId = req.params.userId;
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
      userPassword: Joi.string().min(8).required(),
    });
    await schema.validateAsync(req.body);
    const { userPassword } = req.body;
    const userId = req.params.userId;

    if (req.auth.id !== Number(userId)) {
      const error = new Error("No puedes cambiar la contraseña.");
      error.status = 403;
      throw error;
    }

    const passwordHash = await bcrypt.hash(userPassword, 10);
    const change = await user.changePassword(passwordHash, userId);
    res.send(change);
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

async function login(req, res) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    await schema.validateAsync(req.body);
    const { email, password } = req.body;
    const userSelect = await user.login(email);

    if (!userSelect || userSelect.length === 0) {
      const error = new Error("Usuario equivocado.");
      error.status = 404;
      throw error;
    }
    const contraseñaValidar = await bcrypt.compare(
      password,
      userSelect[0].userPassword
    );
    if (!contraseñaValidar || contraseñaValidar.length === 0) {
      const error = new Error("Contraseña equivocada.");
      error.status = 404;
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
}

module.exports = {
  getUsers,
  getUserSelect,
  newPassword,
  login,
  register,
};
