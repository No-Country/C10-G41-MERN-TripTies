const jwt = require("jsonwebtoken");
const { verifyUser } = require("./auth.services");
require("dotenv").config();
const Auth = require("./auth.services");
const mailer = require("../utils/mailer");
const config = require("../database/config");

const postLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    verifyUser(email, password)
      .then((data) => {
        if (data) {
          const token = jwt.sign(
            {
              _id: data._id,
              username: data.username,
              email: data.email,
            },
            process.env.JWT_SECRET
          );
          res.status(200).json({ message: "Correct credentials", token });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    res.status(400).json({
      message: "All parameters are required",
      fields: {
        email: "example@mail.com",
        password: "String",
      },
    });
  }
};

const postRecoveryToken = (req, res) => {
  const { email } = req.body;
  if (email) {
    Auth.createRecoveryToken(email)
      .then((data) => {
        if (data) {
          mailer.sendMail({
            from: "<tripties.contact@gmail.com>",
            to: email,
            subject: "Recovery Password Trip-Ties",
            html: `<a href='${config.app.host}/api/v1/auth/recovery-password/${data._id}'>${config.app.host}/api/v1/auth/recovery-password/${data._id}</a>`,
          });
        }
        res.status(200).json({ message: "Email sended! Check your inbox." });
      })
      .catch((err) => {
        res.status(400).json({ mesage: err.message });
      });
  } else {
    res.status(400).json({
      message: "Invalid data",
      fields: {
        email: "example@example.com",
      },
    });
  }
};

module.exports = {
  postLogin,
  postRecoveryToken,
};
