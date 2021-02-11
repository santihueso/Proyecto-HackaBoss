const mailgun = require("mailgun-js");
const { MAILGUN_KEY, DOMAIN } = process.env;

async function send(req, res, comment) {
  try {
    const mg = mailgun({
      apiKey: MAILGUN_KEY,
      domain: DOMAIN,
    });

    const data = {
      from: "sender@gmail.com",
      to: "recybook@protonmail.com",
      subject: "recy-book",
      text: comment,
    };
    await mg.messages().send(data);
  } catch (err) {
    if (err.name === "ValdationError") {
      err.code = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = { send };
