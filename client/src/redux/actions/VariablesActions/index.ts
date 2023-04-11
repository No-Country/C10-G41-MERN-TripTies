import axios from "axios";
import { Country } from "../../../types";
import { AppDispatch } from "../../store";

export const getCountries = () => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios.get<Country[]>(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      dispatch({
        type: "GET_COUNTRIES",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};
