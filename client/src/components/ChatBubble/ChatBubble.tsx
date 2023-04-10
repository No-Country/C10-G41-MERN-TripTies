import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from '../../styles/ChatBubble/ChatBubble.module.css'
import { ChatProps, Chat } from '../../types'

interface Message {
    msg: string,
    id: number
}

// NO CAMBIAR NADA AUN ESTA EN DESARROLLO
export default function ChatBubble({ chat, setChat }: ChatProps) {

    // Estado para determinar si el chat está abierto o cerrado
    const [open, setOpen] = useState<string>('62px')
    // Estado para almacenar los mensajes de prueba
    const [msg, setMsg] = useState<Message[]>([{
        msg: 'Hola, ¿cómo estás hoy?',
        id: 1
    },
    {
        msg: 'Estoy bien, gracias. ¿Y tú?',
        id: 2
    }, {
        msg: 'Estoy bien también, gracias. ¿Qué has estado haciendo últimamente?',
        id: 1
    },
    {
        msg: 'He estado trabajando mucho en mi trabajo y también he estado tratando de hacer más ejercicio.',
        id: 2
    }, {
        msg: 'Eso suena bien. Yo también he estado tratando de hacer más ejercicio. ¿Qué tipo de ejercicio haces?',
        id: 1
    },
    {
        msg: 'Me gusta correr y hacer yoga. ¿Y tú?',
        id: 2
    }, {
        msg: 'Me gusta levantar pesas y hacer entrenamiento de intervalos de alta intensidad.',
        id: 1
    },
    {
        msg: 'Eso suena intenso. ¿Te gusta?',
        id: 2
    }, {
        msg: 'Sí, me encanta. Me hace sentir bien y me da energía para el resto del día.',
        id: 1
    },
    {
        msg: 'Eso es genial. ¿Tienes algún consejo para alguien que está tratando de comenzar a hacer ejercicio?',
        id: 2
    }, {
        msg: 'Mi consejo sería comenzar lentamente y encontrar algo que disfrutes hacer. No tienes que hacer nada loco o extremo para obtener beneficios para la salud. Solo trata de ser consistente y verás resultados con el tiempo.',
        id: 1
    },
    {
        msg: 'Eso es un buen consejo. Gracias por compartirlo.',
        id: 2
    }, {
        msg: 'De nada. ¿Quieres ir a tomar un café o algo así?',
        id: 1
    }, {
        msg: 'Claro, me encantaría. ¿Dónde quieres ir?',
        id: 2
    }
    ])
    const ref = useRef<HTMLDivElement>(document.createElement('div'))
    const chatParent = useRef<HTMLDivElement>(null);
    const [message,setMessage] = useState<Message>({
        msg: '',
        id: 1
    })

     // Efecto para scroll al final del chat
    useEffect(() => {
        const domNode = chatParent.current;
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
        }
    });

    function handleOpen() {
        open === '62px' ? setOpen('400px') : setOpen('62px')
    }

    function handleClose() {
        localStorage.removeItem("UserChat")
    }

    function handleMenssage(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage({
            msg: e.target.value,
            id: 1
        })
    }

    // Función para enviar un mensaje
    function enter(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter'){
            setMsg([...msg, message])
            setMessage({
                msg: '',
                id: 1
            })
        }
    }

    // Obtener usuario del almacenamiento local
    const miObjetoJSON: string | null = localStorage.getItem("UserChat");
    const user: Chat = miObjetoJSON ? JSON.parse(miObjetoJSON) : null

    return (
        <>
            {
                user !== null &&

                <div className={styles.container} style={{ height: open }} ref={ref}>
                    <div className={styles.header} onClick={() => handleOpen()}>
                        <div className={styles.infoHeader}>
                            <img src={user.avatar} alt="avatar" />
                            <h4>{user.name}</h4>
                        </div>
                        <div className={styles.button}>
                            <button onClick={() => handleClose()}>X</button>
                        </div>
                    </div>
                    {
                        open === '400px' &&
                        <>

                            <div className={styles.Contentmessages} ref={chatParent}>

                                {
                                    msg.map((e, index) => (
                                        <div key={index} className={e.id === 1 ? styles.MessageSent : styles.messageReceived}>
                                            <small>{e.msg}</small>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.boxtext}>
                                <input name="menssage" value={message.msg} placeholder='Press ENTER' onChange={(e)=>handleMenssage(e)} onKeyUp={(e)=>enter(e)}/>
                            </div>

                        </>
                    }
                </div>
            }
        </>
    )
}