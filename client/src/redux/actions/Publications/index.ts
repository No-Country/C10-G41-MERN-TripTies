import axios from "axios";
import { AppDispatch } from "../../store";

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
        },
        {
          headers: {
            Authorization: `${document.cookie.split(";")[0]}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
};
