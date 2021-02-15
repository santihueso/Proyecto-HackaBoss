const { category } = require("../repository/index.js");

async function goToCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const num1 = +req.params.num1;
    const num2 = +req.params.num2;
    const categories = await category.goToCategory(categoryId, num1, num2);

    res.send(categories);
    res.status(200);
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
