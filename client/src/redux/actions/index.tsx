import axios, { AxiosResponse } from "axios";
import { Users } from "../../types";

// Action para la creacion de un usuario
export const createUser = async (newUser: Users): Promise<AxiosResponse> => {
    try {
        const response = await axios.post('/sign-up', newUser);
        console.log(response)
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}