import React from "react";
import styles from "../../styles/SectionDiscover/SectionChat.module.css";
import avatar1 from "../../img/avatar.png";
import avatar2 from "../../img/avatar2.png";
import avatar3 from "../../img/avatar3.png";
import avatar4 from "../../img/avatar4.png";
import avatar5 from "../../img/avatar5.png";
import avatar6 from "../../img/avatar6.png";
import add from "../../img/message-add.png";
import setting from "../../img/setting.png";

export default function SectionChat() {
  const users = [
    {
      name: "Jane Johnson",
      avatar: avatar1,
    },

    {
      name: "Jan Patrick",
      avatar: avatar2,
    },
    {
      name: "Pablo Alvarado",
      avatar: avatar3,
    },
    {
      name: "Lea Bates",
      avatar: avatar4,
    },
    {
      name: "Flor Pérez",
      avatar: avatar5,
    },
    {
      name: "Thomas May",
      avatar: avatar6,
    },
  ];
  return (
    <>
      <h3 className={styles.title}>Chat</h3>
      <div className={styles.conteiner}>
        <div className={styles.chats}>
          <input
            type="text"
            placeholder="Search messages"
            id={styles["search"]}
          />
          <div className={styles.scroll}>
            {users.map((e, i) => (
              <div key={i} className={styles.avatar}>
                <img src={e.avatar} alt={e.name} />
                <div className={styles.text}>
                  <h2>{e.name}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.config}>
            <hr />
            <div className={styles.messages}>
              <div className={styles.add}>
                <img src={add} alt="message add" />
                <button className={styles.buttons}>New message</button>
              </div>
              <div>
                <button className={styles.buttons}>
                  <img src={setting} alt="setting" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
