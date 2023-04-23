import axios from "axios";
import { AppDispatch } from "../../store";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getAllPublications = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get("/posts").then((response) => {
      return dispatch({
        type: "GET_PUBLICATIONS",
        payload: response.data,
      });
    });
  };
};

export const postPublication = (newPublication: any) => {
  return async function () {
    try {
      const response = await axios.post(
        "/posts",
        {
          content: newPublication.text,
          photo: newPublication.photo,
          video: newPublication.video,
          privacity: newPublication.privacity,
          rate: newPublication.rate,
          name: newPublication.name,
          clasification: newPublication.clasification,
          location: newPublication.location,
          tag: newPublication.tag,
        },
        {
          headers: {
            Authorization: `jwt ${cookies.get("token")}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const editProfile = (user: object) => {
  return async function () {
    const response = await axios.put(`/profiles/${cookies.get("id")}`, user, {
      headers: { Authorization: `jwt ${cookies.get("token")}` },
    });
  };
};

// Tags

export const getTags = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get("/tag").then((response) => {
      dispatch({
        type: "GET_TAGS",
        payload: response.data,
      });
    });
  };
};

export const postComment = ({ comment, id }: any) => {
  return async function () {
    try {
      console.log("action postComment", comment);
      const response = await axios.post(
        `/posts/${id}/comments`,
        {
          parent_id: "?",
          content: comment,
        },
        {
          headers: {
            Authorization: `jwt ${cookies.get("token")}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postLike = (id: any) => {
  return async function () {
    try {
      const token = cookies.get("token");
      console.log("action postLike", token);
      const response = await axios.post(`/posts/${id}/like`, {
        headers: {
          Authorization: `jwt ${token}`,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};
