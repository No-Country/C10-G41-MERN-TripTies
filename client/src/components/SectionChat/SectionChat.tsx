import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/SectionDiscover/SectionChat.module.css'
import avatar1 from '../../img/avatar.png'
import avatar2 from '../../img/avatar2.png'
import avatar3 from '../../img/avatar3.png'
import avatar4 from '../../img/avatar4.png'
import avatar5 from '../../img/avatar5.png'
import avatar6 from '../../img/avatar6.png'
import add from '../../img/message-add.png'
import setting from '../../img/setting.png'
import connected from '../../img/connected.png'
import { useNavigate } from 'react-router-dom'

interface User {
    name: string;
    avatar: string;
    connected: boolean;
}

export default function SectionChat() {
    // Array de usuarios para mostrar en la lista de chats
    const users: User[] = [
        {
            name: 'Jane Johnson',
            avatar: avatar1,
            connected: true
        },
        {
            name: 'Jan Patrick',
            avatar: avatar2,
            connected: true
        },
        {
            name: 'Pablo Alvarado',
            avatar: avatar3,
            connected: false
        },
        {
            name: 'Lea Bates',
            avatar: avatar4,
            connected: true
        },
        {
            name: 'Flor Pérez',
            avatar: avatar5,
            connected: false
        },
        {
            name: 'Thomas May',
            avatar: avatar6,
            connected: true
        }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const nav = useNavigate();

    // Hook para manejar el click fuera del menú de configuración y cerrarlo
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [ref]);

    // Función para cerrar sesión
    function logOut(): void {
        window.localStorage.removeItem("users");
        nav("/login");
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
                    <input type="text" placeholder='Search messages' id={styles['search']} />
                    {/* Lista de usuarios */}
                    <div className={styles.scroll}>
                        {
                            users.map((e: User, index: number) => (
                                <div key={index} className={styles.avatar}>
                                    <img src={e.avatar} alt={e.name} />
                                    <a href='#'>
                                    <div className={styles.text}>
                                        <h2>{e.name}</h2>
                                    </div>
                                    </a>
                                    {
                                        e.connected &&
                                        <img src={connected} alt="connected" />
                                    }
                                </div>
                            ))
                        }
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
                                <ul className={`${styles.menu} ${isOpen ? styles.show : ""} ${isOpen ? styles.center : ''}`}>
                                    <li className={styles.space}></li>
                                    <a href="#" onClick={() => setIsOpen(!isOpen)}>
                                        <li>
                                            View profile
                                        </li>
                                    </a>
                                    <a href="#" onClick={() => setIsOpen(!isOpen)}>
                                        <li>
                                            Account settings
                                        </li>
                                    </a>
                                    {/* Opción para cerrar sesión */}
                                    <a onClick={() => { setIsOpen(!isOpen); logOut(); }}>
                                        <li
                                            id={styles.Log}
                                        >
                                            Log out
                                        </li>
                                    </a>
                                    <li className={styles.space}></li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
