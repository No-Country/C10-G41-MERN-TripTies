import React, { useEffect, useRef, useState } from 'react'
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
import { Profile, putUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import Cookies from "universal-cookie";
import { getProfileUser, getUserById } from '../../redux/actions/Users';

export default function Profile() {
    const [selected, setSelected] = useState(0);
    const [putSelect, setPutSelect] = useState('');
    const [putUser, setPutUser] = useState<putUser>({
        user: {
            first_name: "",
            last_name: "",
            email: ""
        },
        profile: {
            description: "",
            birthday: null,
            portrait: ""
        }
    });

    const selector = useAppSelector;
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const cookies = new Cookies();
    const id = cookies.get("id");
    console.log(id)

    useEffect(() => {
        dispatch(getProfileUser())
    }, [])

    // Hook para manejar el click fuera del menú de configuración y cerrarlo
    useEffect(() => {
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

    const profile: Profile = selector((state) => state.profile);
    //console.log(profile)
    const handleSelect = (index: number) => {
        setSelected(index);
    };

    function handleChange(e) {
        if (e.target.name === 'first_name' || e.target.name === 'last_name') {
            setPutUser({
                ...putUser,
                user:
                {
                    ...putUser.user,
                    [e.target.name]: e.target.value
                }
            })
            console.log(putUser.user.first_name)
            console.log(putUser)
        }
        // setPutUser({
        //     ...putUser,
        //     [e.target.name] : e.target.value
        // })
        //console.log(putUser)
    }

    console.log(putSelect)

    return (
        <div className={styles.container}>
            <NavBar
                profile={profile}
            />
            <div className={styles.containerAllProfiel}>

                <div className={styles.leftContainerFeed}>
                    <div className={styles.feedLeft}>
                        <SectionAccount />
                        <SectionChat />
                    </div>
                    <div className={styles.footerSocial}>
                        <FooterSocial />
                    </div>
                </div>

                <div className={styles.profileContainer}>
                    <div className={styles.profile}>
                        <div className={styles.portada}>
                            <img src={profile.portrait?.length === 0 ? portada : profile.portrait} alt="portada" />
                            {
                                putSelect === 'Change_cover_picture' || putSelect === 'Edit_profile'
                                    ?
                                    <div className={styles.changeCover}>
                                        <input type="file" id="changeCover" name="filename" onChange={(e) => handleChange(e)}></input>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className={styles.infoUser}>
                            <div className={styles.profileAvatar}>
                                <img src={profile.photoUser?.length === 0 ? perfilAvatar : profile.photoUser} alt="perfilAvatar" />
                                {
                                    putSelect === 'Change_profile_picture' || putSelect === 'Edit_profile'
                                        ?
                                        <div className={styles.changeAvatar}>
                                            <input type="file" id="myFile" name="filename"></input>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <div className={styles.username}>
                                <div>
                                    <div className={styles.change}>
                                        {
                                            putSelect === 'Change_name'
                                                ?
                                                <>
                                                    <div className={styles.first_and_last_name}>
                                                        <label htmlFor="">FIRST NAME</label>
                                                        <input type="text" id='changeName' value={putUser.user.first_name} name='first_name' onChange={(e) => handleChange(e)} />
                                                    </div>
                                                    <div className={styles.first_and_last_name}>
                                                        <label htmlFor="">LAST NAME</label>
                                                        <input type="text" id='changeName' value={putUser.user.last_name} name='last_name' onChange={(e) => handleChange(e)} />
                                                    </div>
                                                </>
                                                :
                                                <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
                                        }
                                        {
                                            putSelect === 'Edit_profile'
                                                ?
                                                <div className={styles.changeName} onClick={() => setPutSelect('Change_name')}></div>
                                                :
                                                null
                                        }
                                    </div>
                                    <div className={styles.followins}>
                                        <strong>256 FOLLOWERS</strong>
                                        <strong>300 FOLLOWINS</strong>
                                        <strong>6 REVIEWS</strong>
                                    </div>
                                </div>

                                {/* Menú desplegable */}
                                <div className={styles.dropdown} ref={ref}>
                                    <img
                                        src={menu}
                                        alt="dropdown button"
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    {/* Opciones del menú */}
                                    <ul
                                        className={`${styles.menu} ${isOpen ? styles.show : ""} ${isOpen ? styles.center : ""
                                            }`}
                                    >
                                        <li className={styles.space}></li>
                                        <a onClick={() => { setIsOpen(!isOpen), setPutSelect('Edit_profile') }}>
                                            <li>Edit profile</li>
                                        </a>
                                        <a onClick={() => { setIsOpen(!isOpen), setPutSelect('Change_profile_picture') }}>
                                            <li>Change profile picture</li>
                                        </a>
                                        {/* Opción para cerrar sesión */}
                                        <a onClick={() => { setIsOpen(!isOpen); setPutSelect('Change_cover_picture'); }}>
                                            <li>Change cover picture</li>
                                        </a>
                                        <a onClick={() => { setIsOpen(!isOpen), setPutSelect('Share_profile') }}>
                                            <li>Share profile</li>
                                        </a>
                                        <a onClick={() => { setIsOpen(!isOpen), setPutSelect('') }}>
                                            <li>cancel</li>
                                        </a>
                                        <li className={styles.space}></li>
                                    </ul>
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
