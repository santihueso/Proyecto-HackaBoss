const { seeker } = require("../repository/index.js");
const Joi = require("joi");

async function findCategory(req, res) {
  try {
    const schema = Joi.object({
      category_name: Joi.string(),
    });
    await schema.validateAsync(req.body);
    const { category_name } = req.body;
    const selectCategory = await seeker.forCategory(category_name);
    if (selectCategory.length < 1) {
      throw new Error("No existe");
    }
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
      productName: Joi.string(),
    });
    await schema.validateAsync(req.body);
    const { productName } = req.body;
    const selectName = await seeker.forName(productName);
    if (selectName.length < 1) {
      throw new Error("No existe");
    }
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
      postalCode: Joi.number(),
    });
    await schema.validateAsync(req.body);

    const { postalCode } = req.body;
    const selectCP = await seeker.forCity(postalCode);
    if (selectCP.length < 1) {
      throw new Error("No existe");
    }
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
    if (selectAuthor.length < 1) {
      throw new Error("No existe");
    }
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
