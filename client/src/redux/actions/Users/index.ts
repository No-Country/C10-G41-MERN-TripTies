import axios from "axios";
import { Users } from "../../../types";

// Action para la creacion de un usuario
export const createUser = (newUser: Users) => {
  console.log("action", newUser);
  return async function () {
    try {
      const response = await axios.post("/sign-up", newUser);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

//Action para logear a un usuario
export const loginUser = (email: string, password: string) => {
  console.log(email, password);
  return async function () {
    try {
      const response = await axios.post("/login", { email, password });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
