require("dotenv").config();
const seekerRepository = require("../repository/category.js");

async function goToCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const languages = await seekerRepository.goToCategory(categoryId);
    res.send(languages);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = { goToCategory };
