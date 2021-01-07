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

module.exports = {
  getUsers,
  getUserSelect,
  newPassword,
};
