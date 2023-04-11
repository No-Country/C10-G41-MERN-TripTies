const mongoose = require("mongoose");
const User = require("../models/users.models");
const Profile = require("../models/profiles.models");

const { hash } = require("../utils/crypto");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find()
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const findUserById = async (userId) => {
  let user = await User.findById(userId);
  return user;
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createUser = async (userData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Crear nuevo usuario con campos obligatorios
    const user = new User({
      username: userData.username,
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      email: userData.email,
      password: hash(userData.password),
      photo: userData.photo || "",
      role: userData.role,
    });
    // Guardar usuario en la base de datos
    await user.save({ session });
    // Crear nuevo perfil vacío asociado al usuario
    const profile = new Profile({
      user: user._id,
      description: "",
      birthday: "",
      portrait: "",
    });
    // Guardar perfil en la base de datos
    await profile.save({ session });
    // Completar la transacción
    await session.commitTransaction();
    session.endSession();
    return user;
  } catch (error) {
    // Si hay un error, deshacer la transacción
    await session.abortTransaction();
    session.endSession();
    throw new Error(error.message);
  }
};

const removeUser = async (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          reject(new Error(`User with the id was not found ${userId}`));
        }
        return user.deleteOne();
      })
      .then((deletedUser) => {
        resolve(deletedUser);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateUser = async (id, obj) => {
  const data = await User.updateOne({ _id: id }, obj);
  console.log(data);
  return data[0];
};

const getUserInformation = async (userId) => {
  let user = await User.findOne({ _id: userId });
  return {
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  findUserById,
  createUser,
  removeUser,
  updateUser,
  getUserInformation,
  getUserByUsername,
};
