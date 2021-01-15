require("dotenv").config();
const profileRepository = require("../repository/profile.js");
const Joi = require("joi");

async function profileFromOutside(req, res) {
  try {
    const userId = req.params.userId;
    const showProfile = await profileRepository.showProfileFromOutside(userId);
    res.send(showProfile);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.userId;
    const photo = req.file.path;
    const { username, descriprionUser, city, postalCode } = req.body;
    const schema = Joi.object({
      username: Joi.string(),
      descriprionUser: Joi.string(),
      city: Joi.number(),
      postalCode: Joi.number(),
      photo: Joi.string(),
    });
    await schema.validateAsync({
      username,
      descriprionUser,
      city,
      postalCode,
      photo,
    });

    const updateUser = await userRepository.updateUser(
      username,
      descriprionUser,
      city,
      postalCode,
      photo,
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
    const userId = req.params.userId;
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

module.exports = { profileFromOutside, updateUser, profileUser };
