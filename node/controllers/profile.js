const { profile } = require("../repository/index.js");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function profileFromOutside(req, res) {
  try {
    const userId = req.params.userId;
    const showProfile = await profile.showProfileFromOutside(userId);

    if (!showProfile.user) {
      const error = new Error("El usuario no existe.");
      error.status = 404;
      throw error;
    }
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
    const auth = req.headers.authorization;
    const decode = jwt.decode(auth);
    const userId = decode.id;

    let photo;
    if (req.file) {
      photo = req.file.filename;
    } else {
      photo = req.body.photo;
    }

    const { username, descriptionUser, city, postalCode } = req.body;
    const schema = Joi.object({
      username: Joi.string(),
      descriptionUser: Joi.string(),
      city: Joi.string(),
      postalCode: Joi.number(),
      photo: Joi.string(),
    });
    await schema.validateAsync(req.body);

    const updateUserProfile = await profile.updateUser(
      username,
      descriptionUser,
      city,
      postalCode,
      photo,
      userId
    );

    res.status(200);
    res.send("El perfil se ha publicado.");
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

module.exports = { profileFromOutside, updateUser };
