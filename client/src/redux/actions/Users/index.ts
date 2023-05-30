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
      return response;
    } catch (error) {
      return error;
    }
  };
};

//Action para logear a un usuario
export const loginUser = (user: any) => {
  return async function () {
    try {
      const response = await axios.post("/auth/login", user);
      cookies.set("idUser", response.data.id);
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
      cookies.set("idUser", response.data.id);
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
    return response;
  };
};

export const getPostsByUser = (id: string | undefined) => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get(`/user/${id}`).then((response) => {
      dispatch({
        type: "GET_POSTS_BY_USER",
        payload: response.data,
      });
    });
  };
};

export const getProfileUser = (idProfile: string | undefined) => {
  const id = cookies.get("idUser");
  const token = cookies.get("token");
  return async function (dispatch: AppDispatch) {
    const response = await axios
      .get(`/profiles/${idProfile === undefined ? id : idProfile}`, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        dispatch({ type: "GET_PROFILE", payload: response.data });
      });
    return response;
  };
};

export const editProfile = (data: object) => {
  const idUser = cookies.get("idUser");
  const token = cookies.get("token");
  return async function () {
    const response = await axios.put(
      `/profiles/${idUser}`,
      { user: data },
      {
        headers: { Authorization: `jwt ${token}` },
      }
    );
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
      dispatch({ type: "GET_CONVERSATIONS", payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

//Action para obtener todas las conversaciones
export const getConversationsID = (id: any) => {
  return async function () {
    try {
      const response = await axios.get(`/conversations/${id}`, {
        headers: {
          Authorization: `jwt ${cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

// Action para la creacion de un nuevo mensaje
export const newMessage = (id: string, newMessage: Message) => {
  return async function () {
    try {
      const token = cookies.get("token");
      const response = await axios.post(
        `conversations/${id}/message`,
        newMessage,
        {
          headers: {
            Authorization: `jwt ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
};

// Action para la creacion de una nueva conversacion
export const createConversation = (newConversation: Conversation) => {
  return async function () {
    try {
      const token = cookies.get("token");
      const response = await axios.post(`/conversations`, newConversation, {
        headers: {
          Authorization: `jwt ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getUsersForChat = () => {
  const token = cookies.get("token");
  const id = cookies.get("idUser");
  console.log(id);
  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios
        .get(`/follow/following/${id}`, {
          headers: { Authorization: `jwt ${token}` },
        })
        .then((response) => {
          dispatch({
            type: "GET_USERS_FOR_CHAT",
            payload: response.data,
          });
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const followUser = (following: string) => {
  const id = cookies.get("idUser");
  const token = cookies.get("token");
  return async function () {
    try {
      const response = await axios.post(
        "/follow/followUser",
        {
          follower: id,
          following: following,
        },
        { headers: { Authorization: `jwt ${token}` } }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getFollowing = (id: string | "") => {
  const token = cookies.get("token");
  console.log(id);
  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios
        .get(`/follow/following/${id}`, {
          headers: { Authorization: `jwt ${token}` },
        })
        .then((response) => {
          dispatch({
            type: "GET_FOLLOWING",
            payload: response.data,
          });
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFollowers = (id: string | "") => {
  const token = cookies.get("token");

  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios
        .get(`/follow/followers/${id}`, {
          headers: { Authorization: `jwt ${token}` },
        })
        .then((response) => {
          dispatch({
            type: "GET_FOLLOWERS",
            payload: response.data,
          });
        });
      return response;
    } catch (error) {
      throw error;
    }
  };
};
