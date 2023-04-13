const jwt = require("jsonwebtoken");
const {
  verifyUser,
  createRecoveryToken,
  changePassword,
  verifyUserSocial,
} = require("./auth.services");
require("dotenv").config();
const mailer = require("../utils/mailer");
const config = require("../database/config");

const postLogin = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    verifyUser(email, password)
      .then((data) => {
        console.log("data", data);
        if (data) {
          const token = jwt.sign(
            {
              _id: data._id,
              username: data.username,
              email: data.email,
            },
            process.env.JWT_SECRET
          );
          const id = data._id;
          res.status(200).json({ message: "Correct credentials", token, id });
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

const postLoginSocialNetwork = async (req, res) => {
  const { username } = req.body;
  if (username) {
    verifyUserSocial(username)
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
          const id = data._id;
          res.status(200).json({ message: "Correct credentials", token, id });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    res.status(400).json({
      message: "All parameters are required",
      fields: {
        username: "Username is required",
      },
    });
  }
};

const postRecoveryToken = (req, res) => {
  const { email } = req.body;
  if (email) {
    createRecoveryToken(email)
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

const patchPassword = (req, res) => {
  const { userId } = req.params; //? es el id del registro de recoveryPassword (para recuperar la contraseña)
  const { password } = req.body;

  changePassword(userId, password)
    .then((data) => {
      if (data) {
        res.status(200).json({ message: "Password updated succesfully!" });
      } else {
        res.status(400).json({ message: "URL expired" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  postLogin,
  postLoginSocialNetwork,
  postRecoveryToken,
  patchPassword,
};
