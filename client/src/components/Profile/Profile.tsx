import React from 'react'
import styles from '../../styles/Profile/Profile.module.css'
import avatar from "../../img/avatar.png";

export default function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.children}>
                <img src='https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png' alt="avatar" />
                <div className={styles.name}>
                    <h1>Franco</h1>
                    <h1>Arenas</h1>
                </div>
                <div>
                    <strong>17/06/1994</strong>
                </div>
                <div className={styles.follows}>
                    <div className={styles.following}>
                    <h2>FOLLOWING</h2>
                    <strong>4000</strong>
                    </div>
                    <div className={styles.followers}>
                    <h2>FOLLOWERS</h2>
                    <strong>100000</strong>
                    </div>
                </div>
                <div>
                    <p>San Rafael, Mendoza 🍇🏔 <br />
                        Smile today, maybe tomorrow you need a tooth ...
                        <br /> ⭐⭐⭐</p>
                </div>
            </div>
        </div>
    )
}