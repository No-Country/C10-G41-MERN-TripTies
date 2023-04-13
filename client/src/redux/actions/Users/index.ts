import axios from "axios";
import { Users } from "../../../types";
import Cookies from "universal-cookie";
import { AppDispatch } from "../../store";

const cookies = new Cookies();

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
      cookies.set("id", response.data.id);
      cookies.set("token", response.data.token);
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
      cookies.set("id", response.data.id);
      cookies.set("token", response.data.token);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getUserById = () => {
  const id = cookies.get("id");
  const token = cookies.get("token");

  return async function (dispatch: AppDispatch) {
    const response = await axios
      .get(`/user/${id}`, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) =>
        dispatch({ type: "GET_USER", payload: response.data })
      );
  };
};

export const getProfileUser = () => {
  const id = cookies.get("id");
  const token = cookies.get("token");
  return async function (dispatch: AppDispatch) {
    const response = await axios
      .get(`/profiles/${id}`, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) =>
        dispatch({ type: "GET_PROFILE", payload: response.data })
      );
  };
};

export const cleanProfile = () => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: "CLEAN_PROFILE",
    });
  };
};
