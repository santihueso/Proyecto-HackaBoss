require("dotenv").config();
const userRepository = require("../repository/user.js");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { MAILGUN_KEY, DOMAIN } = process.env;
const mailgun = require("mailgun-js");
const jwt = require("jsonwebtoken");

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

async function register(req, res) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      userPassword: Joi.string().min(8).required(),
      repeatPassword: Joi.ref("contraseña"),
    });
    await schema.validateAsync(req.body);
    const { username, email, userPassword } = req.body;

    const passwordHash = await bcrypt.hash(userPassword, 10);
    const newUser = await userRepository.createUser(
      username,
      email,
      passwordHash
    );
    const mg = mailgun({
      apiKey: MAILGUN_KEY,
      domain: DOMAIN,
    });

    const data = {
      from: "sender@gmail.com",
      to: "jeimymiranda@outlook.es",
      subject: "Hola",
      text: "Testing some Mailgun awesomness!",
    };
    await mg.messages().send(data);

    res.send(newUser);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      userPassword: Joi.string().min(8).required(),
    });
    await schema.validateAsync(req.body);
    const { email, userPassword } = req.body;
    const user = await userRepository.logearse(email);
    if (!user) {
      console.log("error");
    }
    const validPassword = await bcrypt.compare(
      userPassword,
      user[0].userPassword
    );
    if (!validPassword) {
      console.log("error");
    }

    const tokePayload = { id: user[0].id, name: user[0].username };
    const token = jwt.sign(tokePayload, process.env.JWT, { expiresIn: "30d" });
    res.send(token);
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

async function upImgUser(req, res) {
  try {
    const userId = req.params.userId;
    const imgUser = req.file.path;

    const img = await userRepository.imageUser(imgUser, userId);
    res.send(img);
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

module.exports = {
  getUsers,
  register,
  login,
  getUserSelect,
  upImgUser,
  newPassword,
};
