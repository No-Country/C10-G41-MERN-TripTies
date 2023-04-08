import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import styles from '../../styles/ChatBubble/ChatBubble.module.css'
import { ChatProps } from '../../types'

export default function ChatBubble({ chat, setChat }: ChatProps) {
    const [open, setOpen] = useState('62px')
    const [msg,setMsg] = useState([{
        msg: 'HOLA',
        id: 1
    },
    {
        msg: 'HOLA QUE TAL',
        id: 2
    },{
        msg: 'BUEN DIA',
        id: 1
    },{
        msg: 'PA LAS TURRAS AHI EVILLA!',
        id: 2
    }])
    const ref = useRef<HTMLDivElement>(document.createElement('div'))

    function handleOpen() {
        open === '62px' ? setOpen('400px') : setOpen('62px')
    }

    const miObjetoJSON: any = localStorage.getItem("UserChat");
    const user =JSON.parse(miObjetoJSON)

    return (
        <>
            {
                user.length !== 0 &&

                <div className={styles.container} style={{ height: open }} ref={ref}>
                    <div className={styles.header} onClick={() => handleOpen()}>
                        <div className={styles.info}>
                            <img src={user.avatar} alt="avatar" />
                            <h4>{user.name}</h4>
                        </div>
                    </div>
                    {
                        open === '400px' &&
                        <>
                            <div className={styles.Contentmessages}>
                                <div className={styles.messages}>
                                    {
                                        msg.map( e => (
                                        <div>
                                        {e.msg}
                                        </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={styles.boxtext}>
                                <textarea name="" id="" cols={35} rows={2}></textarea>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}