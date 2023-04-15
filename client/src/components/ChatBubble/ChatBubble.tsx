import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/ChatBubble/ChatBubble.module.css";
import { ChatProps, Chat, Message } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  createConversation,
  getAllConversations,
  newMessage,
} from "../../redux/actions/Users";
import avatar7 from "../../img/user_avatar_default.jpg";
interface Conversation {
  _id: string;
  title: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
interface MessageUsers {
  msg: string;
  id: number;
}

// NO CAMBIAR NADA AUN ESTA EN DESARROLLO
export default function ChatBubble({ chat, setChat }: ChatProps) {
  const avatarDefault = avatar7;

  // Obtener usuario del almacenamiento local
  const miObjetoJSON: string | null = localStorage.getItem("UserChat");
  const user: Chat = miObjetoJSON ? JSON.parse(miObjetoJSON) : null;

  // Estado para determinar si el chat está abierto o cerrado
  const [open, setOpen] = useState<string>("62px");
  // Estado para almacenar los mensajes de prueba
  const [msg, setMsg] = useState<MessageUsers[]>([
    {
      msg: "Hola, ¿cómo estás hoy?",
      id: 1,
    },
    {
      msg: "Estoy bien, gracias. ¿Y tú?",
      id: 2,
    },
    {
      msg: "Estoy bien también, gracias. ¿Qué has estado haciendo últimamente?",
      id: 1,
    },
    {
      msg: "He estado trabajando mucho en mi trabajo y también he estado tratando de hacer más ejercicio.",
      id: 2,
    },
    {
      msg: "Eso suena bien. Yo también he estado tratando de hacer más ejercicio. ¿Qué tipo de ejercicio haces?",
      id: 1,
    },
    {
      msg: "Me gusta correr y hacer yoga. ¿Y tú?",
      id: 2,
    },
    {
      msg: "Me gusta levantar pesas y hacer entrenamiento de intervalos de alta intensidad.",
      id: 1,
    },
    {
      msg: "Eso suena intenso. ¿Te gusta?",
      id: 2,
    },
    {
      msg: "Sí, me encanta. Me hace sentir bien y me da energía para el resto del día.",
      id: 1,
    },
    {
      msg: "Eso es genial. ¿Tienes algún consejo para alguien que está tratando de comenzar a hacer ejercicio?",
      id: 2,
    },
    {
      msg: "Mi consejo sería comenzar lentamente y encontrar algo que disfrutes hacer. No tienes que hacer nada loco o extremo para obtener beneficios para la salud. Solo trata de ser consistente y verás resultados con el tiempo.",
      id: 1,
    },
    {
      msg: "Eso es un buen consejo. Gracias por compartirlo.",
      id: 2,
    },
    {
      msg: "De nada. ¿Quieres ir a tomar un café o algo así?",
      id: 1,
    },
    {
      msg: "Claro, me encantaría. ¿Dónde quieres ir?",
      id: 2,
    },
  ]);
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
    dispatch(getAllConversations());
  }, [conversationID]);

  async function newConversation() {
    const oldConversation = conversations.filter((e) => e.title === user?.id);

    if (oldConversation.length === 0) {
      const newConversation = {
        title: `${user.id}`,
        participantId: `${user.id}`,
      };
      const response = await dispatch(createConversation(newConversation));
      setConversationID(response.data.participant1.conversation);
    } else {
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
    }
  }

  return (
    <>
      {user !== null && (
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
                      e.id === 1 ? styles.MessageSent : styles.messageReceived
                    }
                  >
                    <small>{e.msg}</small>
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
