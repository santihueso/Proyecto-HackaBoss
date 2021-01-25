const seekerRepository = require("../repository/category.js");

async function goToCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const category = await seekerRepository.goToCategory(categoryId);

    if (category.length === 0) {
      res.send("No hay libros en esta categoría.");
    } else {
      res.send(category);
    }
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
