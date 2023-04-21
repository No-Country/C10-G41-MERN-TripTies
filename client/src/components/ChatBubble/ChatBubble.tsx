import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/ChatBubble/ChatBubble.module.css";
import { Chat, Message } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
    createConversation,
    getAllConversations,
    getConversationsID,
    newMessage,
} from "../../redux/actions/Users";
import Cookies from "universal-cookie";
import avatar7 from "../../img/user_avatar_default.jpg";

interface Conversation {
    _id: string;
    title: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}

interface MessageUsers {
    conversation: string;
    message: string;
    user: string;
    __v: number
    _id: string;
}

// NO CAMBIAR NADA AUN ESTA EN DESARROLLO
export default function ChatBubble({ UserChatActual }: any) {

    const avatarDefault = avatar7
    const cookies = new Cookies();
    const idUser = cookies.get("idUser");

    // Obtener usuario del almacenamiento local
    const miObjetoJSON: string | null = localStorage.getItem("UserChat");
    const user: Chat = miObjetoJSON ? JSON.parse(miObjetoJSON) : null;

    // Estado para determinar si el chat está abierto o cerrado
    const [open, setOpen] = useState<string>("62px");
    // Estado para almacenar los mensajes
    const [msg, setMsg] = useState<MessageUsers[]>([]);
    let msgLength = 0;

    const [render, setRender] = useState<boolean>(true);
    const ref = useRef<HTMLDivElement>(document.createElement("div"));
    const chatParent = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const conversations: Conversation[] = useAppSelector(
        (state) => state.conversations
    );
    const [conversationID, setConversationID] = useState<string>("");
    const [message, setMessage] = useState<Message>({
        message: "",
    });

    // Efecto para scroll al final del chat
    useEffect(() => {
        const domNode = chatParent.current;
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
        }
    });

    // Efecto para filtrar las conversaciones
    useEffect(() => {
        dispatch(getAllConversations())
        console.log(UserChatActual)
    }, [conversationID, msg]);

    useEffect(() => {
        if (conversations.length !== 0) {
            newConversation()
        }
    }, [UserChatActual, render]);

    // Función para verificar si hay nuevos mensajes
    useEffect(() => {
        const interval = setInterval(() => {
            if (msg.length !== msgLength) {
                newConversation();
                msgLength = msg.length;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [msg]);

    async function newConversation() {
        // FUI PARTICIPANTE
        const participant = conversations.filter((e) => e.title === idUser);
        // FUI CREADOR DE LA CONVERSACION
        const creador = conversations.filter((e) => e.user === idUser);

        const conversation = creador.concat(participant)
        // EXISTE UNA CONERSACION CON ESE USUARIO DONDE FUI PARTICIPANTE
        const existParticipant = conversation.filter(e => e.title === idUser && e.user === user.id)
        // EXISTE UNA CONERSACION CON ESE USUARIO DONDE FUI CREADOR
        const existCreador = conversation.filter(e => e.title === user.id && e.user === idUser)


        console.log(existParticipant.concat(existCreador))

        if (existParticipant.concat(existCreador).length !== 0) {
            dispatch(getConversationsID(existParticipant.concat(existCreador)[0]._id))
                .then(res => setMsg(res.conversation.messages))
                .catch(res => console.log(res))
            setConversationID(existParticipant.concat(existCreador)[0]._id)
            console.log(msg)
            console.log('EXISTE')
        } else {
            const newConversation = {
                title: `${user.id}`,
                participantId: `${user.id}`,
            };
            console.log('NO EXISTE')
            const response = await dispatch(createConversation(newConversation));
            setConversationID(response.data.participant1.conversation);
            console.log(response.data.participant1.conversation)
        }

    }

    function handleOpen() {
        open === "62px" ? setOpen("400px") : setOpen("62px");
    }

    function handleClose() {
        localStorage.removeItem("UserChat");
    }

    function handleWriteMessage(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage({
            message: e.target.value,
        });
    }

    // Función para enviar un mensaje
    function handleSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && message.message.length !== 0) {
            dispatch(newMessage(conversationID, message));
            setMessage({
                message: "",
            });
            dispatch(getConversationsID(conversationID))
                .then(res => setMsg(res.conversation.messages))
            setRender(!render)
        }
    }

    return (
        <>
            {UserChatActual && user !== null && (
                <div className={styles.container} style={{ height: open }} ref={ref}>
                    <div className={styles.header} onClick={() => handleOpen()}>
                        <div className={styles.infoHeader}>
                            <img
                                src={
                                    user.avatar && user.avatar?.length > 10
                                        ? user.avatar
                                        : avatarDefault
                                }
                                alt="avatar"
                            />
                            <h4>{user.name}</h4>
                        </div>
                        <div className={styles.button}>
                            <button onClick={() => handleClose()}>X</button>
                        </div>
                    </div>
                    {open === "400px" && (
                        <>
                            <div className={styles.Contentmessages} ref={chatParent}>
                                {msg.map((e, index) => (
                                    <div
                                        key={index}
                                        className={
                                            e.user === idUser ? styles.MessageSent : styles.messageReceived
                                        }
                                    >
                                        <small>{e.message}</small>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.boxtext}>
                                <input
                                    name="menssage"
                                    value={message.message}
                                    placeholder="Press ENTER"
                                    onFocus={() => newConversation()}
                                    onChange={(e) => handleWriteMessage(e)}
                                    onKeyUp={(e) => handleSendMessage(e)}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
