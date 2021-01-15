const { bookController } = require("./bookController.js");
const { profile } = require("./profile.js");
const { purchase } = require("./purchase.js");
const { reservation } = require("./reservation.js");
const { seeker } = require("./seeker.js");
const { userController } = require("./userController.js");

module.exports = {
  bookController,
  profile,
  purchase,
  reservation,
  seeker,
  userController,
};
