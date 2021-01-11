require("dotenv").config();
const userRepository = require("../repository/user.js");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { string, number } = require("joi");

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
async function getUser(req, res) {
  try {
    const user = await userRepository.getUser();
    res.send(user);
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

async function registro(req, res) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      passwordAgain: Joi.ref("password"),
    });
    await schema.validateAsync(req.body);
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(contraseña, 10);
    const newUser = await userRepository.createUser(
      username,
      email,
      hashPassword
    );
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
    const user = await userRepository.logearse(email);
    if (!user) {
      console.log("error");
    }
    const contraseñaValidar = await bcrypt.compare(password, user[0].password);
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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getUserSelect(req, res) {
  try {
    const userId = req.params.userId;
    const selectUser = await userRepository.selectUser(userId);
    res.send(selectUser);
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

async function updateUser(req, res) {
  try {
    const userId = req.params.id_user;
    const { username, photo, city, postalCode } = req.body;
    const schema = Joi.object({
      username: Joi.string(),
      photo: Joi.string(),
      city: Joi.number(),
      postalCode: Joi.number(),
    });
    await schema.validateAsync({
      username,
      photo,
      city,
      postalCode,
    });

    const updateUser = await userRepository.updateUser(
      username,
      photo,
      city,
      postalCode,
      userId
    );
    res.send(updateUser);
  } catch (err) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------

async function profileUser(req, res) {
  try {
    const userId = req.params.id_user;
    const showProfileUser = await profileRepository.showProfileUser(userId);
    res.send(showProfileUser);
  } catch (error) {
    if (err.name === "validationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//----------valoraciones------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  getUser,
  registro,
  login,
  getUserSelect,
  updateUser,
  profileUser,
};
