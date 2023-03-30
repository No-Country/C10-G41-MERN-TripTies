import React from 'react'
import styles from '../../styles/SectionDiscover/SectionChat.module.css'
import avatar1 from '../../img/avatar.png'
import avatar2 from '../../img/avatar2.png'
import avatar3 from '../../img/avatar3.png'
import avatar4 from '../../img/avatar4.png'
import avatar5 from '../../img/avatar5.png'
import avatar6 from '../../img/avatar6.png'

export default function SectionChat() {
    const users = [
        {
            name : 'Sophia',
            avatar : avatar1
        },
        
        {
            name : 'Emma',
            avatar : avatar2
        },
        {
            name : 'Jake',
            avatar : avatar3
        },
        {
            name : 'Olivia',
            avatar : avatar4
        },
        {
            name : 'Emily',
            avatar : avatar5
        },
        {
            name : 'Connor',
            avatar : avatar6
        }
    ]
  return (
    <>
        <h3 className={styles.title}>Chat</h3>
        <div className={styles.conteiner}>
        <div className={styles.chats}>
            <input type="text" placeholder='Search messages' id={styles['search']}/>

            {
                users.map(e => (
                    <div className={styles.avatar}>
                    <img src={e.avatar} alt={e.name} />
                    <div className={styles.text}>
                    <h2>{e.name}</h2>
                    <p>Desc</p>
                </div>
                    </div>
                ))
            }
        </div>
        </div>
    </>
  )
}
