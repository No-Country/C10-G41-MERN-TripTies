import axios from "axios";
import { Users } from "../../../types";

// Action para la creacion de un usuario
export const createUser = (newUser: Users) => {
  return async function () {
    try {
      const response = await axios.post("/auth/sign-up", newUser);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

//Action para logear a un usuario
export const loginUser = (user: object) => {
  return async function () {
    try {
      const response = await axios.post("/auth/login", user);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

// Logueo con redes sociales
export const loginSocialNetworks = (user: object) => {
  return async function () {
    try {
      const response = await axios.post("/auth/loginSocial", user);
      return response;
    } catch (error) {
      throw error;
    }
  };
};
