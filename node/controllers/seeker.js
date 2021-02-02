const { seeker } = require("../repository/index.js");
const Joi = require("joi");

async function findCategory(req, res) {
  try {
    const schema = Joi.object({
      category: Joi.string(),
    });
    await schema.validateAsync(req.body);
    const { category } = req.body;
    const selectCategory = await seeker.forCategory(category);

    res.send(selectCategory);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function findName(req, res) {
  try {
    const schema = Joi.object({
      title: Joi.string(),
    });
    await schema.validateAsync(req.body);
    const { title } = req.body;
    const selectName = await seeker.forName(title);

    res.send(selectName);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function findCP(req, res) {
  try {
    const schema = Joi.object({
      cp: Joi.number(),
    });
    await schema.validateAsync(req.body);

    const { cp } = req.body;
    const selectCP = await seeker.forCity(cp);

    res.send(selectCP);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function findAuthor(req, res) {
  try {
    const schema = Joi.object({
      author: Joi.string(),
    });

    await schema.validateAsync(req.body);
    const { author } = req.body;

    const selectAuthor = await seeker.forAuthor(author);

    res.send(selectAuthor);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = { findCategory, findName, findCP, findAuthor };
