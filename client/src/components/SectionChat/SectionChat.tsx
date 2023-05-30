import { useEffect, useRef, useState } from "react";
import styles from "../../styles/SectionDiscover/SectionChat.module.css";
import avatar7 from "../../img/user_avatar_default.jpg";
import add from "../../img/message-add.png";
import setting from "../../img/setting.png";
import connected from "../../img/connected.png";
import { Link, useNavigate } from "react-router-dom";
import { ChatProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  cleanProfile,
  getAllUsers,
  getUsersForChat,
} from "../../redux/actions/Users";
import Cookies from "universal-cookie";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  photoUser: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  isOnline: boolean;
}

export default function SectionChat({ setUserChatActual }: any): JSX.Element {
  const avatarDefault = avatar7;

  // Obtener token del almacenamiento local
  const token: string | null = localStorage.getItem("token");
  const cookies = new Cookies();
  const id = cookies.get("idUser");

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userChats);
  const nav = useNavigate();

  // Hook para manejar el click fuera del menú de configuración y cerrarlo
  useEffect(() => {
    dispatch(getUsersForChat());
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  // Función para cerrar sesión
  function logOut(): void {
    dispatch(cleanProfile());
    cookies.remove("login");
    cookies.remove("idUser");
    cookies.remove("token");
    cookies.set("visit", false);
    window.localStorage.removeItem("UserChat");
    nav("/login");
  }

  function handleNewChat(name: string, avatar: string, id: string) {
    localStorage.setItem(
      "UserChat",
      JSON.stringify({ name: name, avatar: avatar, id })
    );
    setUserChatActual({ name: name, avatar: avatar, id });
  }

  return (
    <>
      {/* Título */}
      <h3 className={styles.title}>Chat</h3>
      {/* Contenedor principal */}
      <div className={styles.conteiner}>
        {/* Sección de chats */}
        <div className={styles.chats}>
          {/* Campo de búsqueda */}
          <input
            type="text"
            placeholder="Search messages"
            id={styles["search"]}
          />
          {/* Lista de usuarios */}
          <div className={styles.scroll}>
            {user.map((e: User, index: number) => {
              return (
                <div key={index} className={styles.avatar}>
                  <img
                    src={
                      e.photoUser && e.photoUser?.length > 10
                        ? e.photoUser
                        : avatarDefault
                    }
                    alt={e.username}
                  />
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleNewChat(e.username, e.photoUser, e._id)
                    }
                  >
                    <div className={styles.text}>
                      <h2>{e.username}</h2>
                    </div>
                  </a>
                  {e.isOnline && <img src={connected} alt="connected" />}
                </div>
              );
            })}
          </div>
          {/* Seccion de botones del chat */}
          <div className={styles.config}>
            <hr />
            {/* Botón para agregar mensaje */}
            <div className={styles.messages}>
              <div className={styles.add}>
                <a href="#">
                  <img src={add} alt="message add" />
                </a>
                <button className={styles.buttons}>New message</button>
              </div>
              {/* Menú desplegable */}
              <div className={styles.dropdown} ref={ref}>
                <img
                  src={setting}
                  alt="dropdown button"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {/* Opciones del menú */}
                <ul
                  className={`${styles.menu} ${isOpen ? styles.show : ""} ${
                    isOpen ? styles.center : ""
                  }`}
                >
                  <li className={styles.space}></li>
                  <Link
                    to={`/profile/${id}`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <li>View profile</li>
                  </Link>
                  <Link
                    to={`/profile/${id}`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <li>Account settings</li>
                  </Link>
                  {/* Opción para cerrar sesión */}
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      logOut();
                    }}
                  >
                    <li id={styles.Log}>Log out</li>
                  </a>
                  <li className={styles.space}></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
