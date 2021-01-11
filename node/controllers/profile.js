const profileRepository = require("../repository/profile.js");

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

module.exports = { profileFromOutside };
