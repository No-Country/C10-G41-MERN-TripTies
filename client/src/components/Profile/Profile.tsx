import React, { useState } from 'react'
import styles from '../../styles/Profile/Profile.module.css'
import avatar from "../../img/avatar.png";
import NavBar from '../NavBar/NavBar';
import SectionAccount from '../Section Account/SectionAccout';
import SectionChat from '../SectionChat/SectionChat';
import FooterSocial from '../Footers/FooterSocial';
import portada from "../../img/portada_perfil.png";
import perfilAvatar from "../../img/perfil_avatar.png";
import FooterTerm from '../Footers/FooterTerm';
import menu from "../../img/menu-horizontal.png";
import star from "../../img/star.png";
import pin from "../../img/locationH.png";
import book from "../../img/taskAcc.png";
import saved from "../../img/archive-tick.png";

export default function Profile() {
    const [selected, setSelected] = useState(0);

    const handleSelect = (index: number) => {
        setSelected(index);
    };
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.containerAllProfiel}>

                <div className={styles.leftContainerFeed}>
                    <div className={styles.feedLeft}>
                        {/* <SectionAccount /> */}
                        <SectionChat />
                    </div>
                    <div className={styles.footerSocial}>
                        <FooterSocial />
                    </div>
                </div>

                <div className={styles.profileContainer}>
                    <div className={styles.profile}>
                        <div className={styles.portada}>
                            <img src={portada} alt="portada" />
                        </div>
                        <div className={styles.infoUser}>
                            <div className={styles.profileAvatar}>
                                <img src={perfilAvatar} alt="perfilAvatar" />
                            </div>
                            <div className={styles.username}>
                                <div>
                                    <h2>Emma Lopez</h2>
                                    <strong>256 FOLLOWERS</strong>
                                </div>
                                <div className={styles.followins}>
                                    <strong>300 FOLLOWINS</strong>
                                </div>
                                <div className={styles.reviews}>
                                    <strong>6 REVIEWS</strong>
                                </div>
                                <div className={styles.menu}>
                                    <img src={menu} alt="menu" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.sections}>
                            <div className={`${selected === 0 ? styles.selected : styles.review}`} onClick={() => handleSelect(0)}>
                                <img src={star} alt="star" width='24px' height='24px' /> Reviews
                            </div>
                            <div className={`${selected === 1 ? styles.selected : styles.places}`} onClick={() => handleSelect(1)}>
                                <img src={pin} alt="star" width='24px' height='24px' />Places I've been
                            </div>
                            <div className={`${selected === 2 ? styles.selected : styles.bucket}`} onClick={() => handleSelect(2)}>
                                <img src={book} alt="star" width='24px' height='24px' />Bucket list
                            </div>
                            <div className={`${selected === 3 ? styles.selected : styles.saved}`} onClick={() => handleSelect(3)}>
                                <img src={saved} alt="star" width='24px' height='24px' />Saved
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className={styles.footerTerm}>
                        <FooterTerm />
                    </div>
                </div>

            </div>
        </div>
    )
}
