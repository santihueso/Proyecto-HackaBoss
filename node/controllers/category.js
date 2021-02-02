const { category } = require("../repository/index.js");

async function goToCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const categories = await category.goToCategory(categoryId);

    res.send(categories);
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
