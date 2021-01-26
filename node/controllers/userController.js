const userRepository = require("../repository/user.js");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const sendMenssage = require("../messages/sendMessage.js");
const jwt = require("jsonwebtoken");
const success = "You have successfully registered!";

async function getUsers(req, res) {
  try {
    const user = await userRepository.getUser();
    res.send(user);
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
    const selectUser = await userRepository.selectUser(userId);

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
    const passwordHash = await bcrypt.hash(userPassword, 10);
    const change = await userRepository.changePassword(passwordHash, userId);
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
    const newUser = await userRepository.createUser(
      username,
      email,
      hashPassword
    );
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
    const user = await userRepository.login(email);

    if (!user) {
      console.log("error");
    }
    const contraseñaValidar = await bcrypt.compare(
      password,
      user[0].userPassword
    );
    if (!contraseñaValidar) {
      console.log("error");
    }

    const tokePayload = { id: user[0].id, username: user[0].username };
    const token = jwt.sign(tokePayload, process.env.JWT, { expiresIn: "30d" });
    res.send(token);
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
