import axios from "axios";
import { Message, Users, Conversation } from "../../../types";
import { AppDispatch } from "../../store";

// Action para la creacion de un usuario
export const createUser = (newUser: Users) => {
    return async function () {
        try {
            const response = await axios.post('auth/sign-up', newUser);
            console.log(response)
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

//Action para logear a un usuario
export const loginUser = (email: string, password: string) => {
    return async function () {
        try {
            const response = await axios.post('auth/login', { email, password });
            await localStorage.setItem("token", `${response.data.token}`)
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

//Action para obtener todos los usuarios
export const getAllUsers = () => {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axios.get('/user', {
                headers: {
                    'Authorization': `jwt ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            dispatch({ type: "GET_USER", payload: response.data });
            return response.data
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

//Action para obtener todas las conversaciones
export const getAllConversations = () => {
    return async function (dispatch: AppDispatch) {
        try {
            const response = await axios.get('/conversations', {
                headers: {
                    'Authorization': `jwt ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            dispatch({ type: "GET_CONVERSATIONS", payload: response.data });
            return response.data
        
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

// Action para la creacion de un nuevo mensaje
export const newMessage = (id: string,newMessage: Message) => {
    return async function () {
        try {
            const response = await axios.post(`conversations/${id}/message`, newMessage, {
                headers: {
                    'Authorization': `jwt ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

// Action para la creacion de una nueva conversacion
export const createConversation = (newConversation: Conversation) => {
    return async function () {
        try {
            const response = await axios.post(`/conversations`, newConversation, {
                headers: {
                    'Authorization': `jwt ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data)
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}