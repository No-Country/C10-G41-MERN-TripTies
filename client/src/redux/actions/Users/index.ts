import axios from "axios";
import Cookies from "universal-cookie";
import { AppDispatch } from "../../store";
const cookies = new Cookies();
import { Message, Users, Conversation } from "../../../types";

// Action para la creacion de un usuario
export const createUser = (newUser: Users) => {
  return async function () {
    try {
      const response = await axios.post("auth/sign-up", newUser);
      cookies.set("idUser", response.data._id);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

//Action para logear a un usuario
export const loginUser = (user: any) => {
  return async function () {
    try {
      const response = await axios.post("/auth/login", user);
      cookies.set("id", response.data.id);
      cookies.set("token", response.data.token);
      console.log(response);
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
  const id = cookies.get("idUser");
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
  const id = cookies.get("idUser");
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

export const editProfile = (data: object) => {
  const idUser = cookies.get("id");
  const token = cookies.get("token");
  return async function () {
    const response = await axios.put(`/profiles/${idUser}`, data, {
      headers: { Authorization: `jwt ${token}` },
    });
    console.log(response);
    return response;
  };
};

export const cleanProfile = () => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: "CLEAN_PROFILE",
    });
  };
};

//Action para obtener todos los usuarios
export const getAllUsers = () => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `jwt ${cookies.get("token")}`,
        },
      });
      dispatch({ type: "GET_USERS", payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

//Action para obtener todas las conversaciones
export const getAllConversations = () => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios.get("/conversations", {
        headers: {
          Authorization: `jwt ${cookies.get("token")}`,
        },
      });
      console.log(response);
      dispatch({ type: "GET_CONVERSATIONS", payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// Action para la creacion de un nuevo mensaje
export const newMessage = (id: string, newMessage: Message) => {
  return async function () {
    try {
      const response = await axios.post(
        `conversations/${id}/message`,
        newMessage,
        {
          headers: {
            Authorization: `jwt ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// Action para la creacion de una nueva conversacion
export const createConversation = (newConversation: Conversation) => {
  return async function () {
    try {
      const response = await axios.post(`/conversations`, newConversation, {
        headers: {
          Authorization: `jwt ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
