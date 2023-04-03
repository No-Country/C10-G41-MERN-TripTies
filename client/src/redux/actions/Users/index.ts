import axios from "axios";
import { Users } from "../../../types";

// Action para la creacion de un usuario
export const createUser = (newUser: Users) => {
    return async function() {       
        try {
            const response = await axios.post('/sign-up', newUser);
            console.log(response)
            return response
        } catch (error) {
            console.log(error);
            throw error;
    }
 }
}