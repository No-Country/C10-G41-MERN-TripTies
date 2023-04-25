import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Profile/Profile.module.css";
import NavBar from "../NavBar/NavBar";
import SectionAccount from "../Section Account/SectionAccout";
import SectionChat from "../SectionChat/SectionChat";
import FooterSocial from "../Footers/FooterSocial";
import portada from "../../img/portada_perfil.png";
import FooterTerm from "../Footers/FooterTerm";
import menu from "../../img/menu-horizontal.png";
import star from "../../img/star.png";
import pin from "../../img/locationH.png";
import { Profile, putUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Cookies from "universal-cookie";
import {
  followUser,
  getFollowers,
  getFollowing,
  getPostsByUser,
} from "../../redux/actions/Users";
import { useNavigate, useParams } from "react-router-dom";
import avatarDefault from "../../img/user_avatar.png";
import { getProfileUser, getUserById } from "../../redux/actions/Users";
import ChatBubble from "../ChatBubble/ChatBubble";

export default function Profile() {
  const nav = useNavigate();
  const selector = useAppSelector;
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState(0);
  const [putSelect, setPutSelect] = useState("");

  const [putUser, setPutUser] = useState<putUser>({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      photoUser: "",
    },
    profile: {
      description: "",
      birthday: null,
      portrait: "",
    },
  });

  let { id } = useParams();

  useEffect(() => {
    dispatch(getPostsByUser(id));
    dispatch(getUserById());
    dispatch(getProfileUser(id));
    dispatch(getFollowing());
    dispatch(getFollowers());
  }, []);

  const profile: Profile = selector((state) => state.profile);
  const user = selector((state) => state.user);
  const following = selector((state) => state.following);
  const followers = selector((state) => state.followers);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const cookies = new Cookies();
  const idUser = cookies.get("idUser");

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

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const isFollowing = following.map((e: any) => {
    return e._id === id;
  });

  function handleChange(e: any) {
    if (e.target.name === "first_name" || e.target.name === "last_name") {
      setPutUser({
        ...putUser,
        user: {
          ...putUser.user,
          [e.target.name]: e.target.value,
        },
      });
    }
  }
  
  const handleFollow = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    dispatch(followUser(e.target.value)).then(() => nav("/home"));
  };

  const [UserChatActual, setUserChatActual] = useState({});

  return (
    <div className={styles.container}>
      <NavBar profile={profile} user={user} />
      <div className={styles.containerAllProfiel}>
        <div className={styles.leftContainerFeed}>
          <div className={styles.feedLeft}>
            <SectionAccount />
            <SectionChat setUserChatActual={setUserChatActual} />
          </div>
          <div className={styles.footerSocial}>
            <FooterSocial />
          </div>
        </div>

        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <div className={styles.portada}>
              <img
                src={
                  profile.portrait?.length === 0 ? portada : profile.portrait
                }
                alt="portada"
              />
              {putSelect === "Change_cover_picture" ||
                putSelect === "Edit_profile" ? (
                <div className={styles.changeCover}>
                  <input
                    type="file"
                    id="changeCover"
                    name="filename"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
              ) : null}
            </div>
            <div className={styles.infoUser}>
              <div className={styles.profileAvatar}>
                <img
                  src={
                    profile.photoUser?.length !== 0
                      ? profile.photoUser
                      : avatarDefault
                  }
                  alt="perfilAvatar"
                />
                {putSelect === "Change_profile_picture" ||
                  putSelect === "Edit_profile" ? (
                  <div className={styles.changeAvatar}>
                    <input type="file" id="myFile" name="filename"></input>
                  </div>
                ) : null}
              </div>
              <div className={styles.usernameAndDrow}>
                <div  className={styles.username}>
                  <div className={styles.change}>
                    {putSelect === "Change_name" ? (
                      <>
                        <div className={styles.first_and_last_name}>
                          <label htmlFor="">FIRST NAME</label>
                          <input
                            type="text"
                            id="changeName"
                            value={putUser.user.first_name}
                            name="first_name"
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className={styles.first_and_last_name}>
                          <label htmlFor="">LAST NAME</label>
                          <input
                            type="text"
                            id="changeName"
                            value={putUser.user.last_name}
                            name="last_name"
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </>
                    ) : (
                      <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
                    )}
                    {putSelect === "Edit_profile" ? (
                      <div
                        className={styles.changeName}
                        onClick={() => setPutSelect("Change_name")}
                      ></div>
                    ) : null}
                  </div>
                  <div className={styles.followins}>
                    <strong>{followers.length} FOLLOWERS</strong>
                    <strong>{following.length} FOLLOWINS</strong>
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
                  {idUser === id ? (
                    <ul
                      className={`${styles.menu} ${isOpen ? styles.show : ""} ${isOpen ? styles.center : ""
                        }`}
                    >
                      <li className={styles.space}></li>
                      <a
                        onClick={() => {
                          setIsOpen(!isOpen), setPutSelect("Edit_profile");
                        }}
                      >
                        <li>Edit profile</li>
                      </a>
                      <a
                        onClick={() => {
                          setIsOpen(!isOpen),
                            setPutSelect("Change_profile_picture");
                        }}
                      >
                        <li>Change profile picture</li>
                      </a>
                      {/* Opción para cerrar sesión */}
                      <a
                        onClick={() => {
                          setIsOpen(!isOpen);
                          setPutSelect("Change_cover_picture");
                        }}
                      >
                        <li>Change cover picture</li>
                      </a>
                      <a
                        onClick={() => {
                          setIsOpen(!isOpen), setPutSelect("");
                        }}
                      >
                        <li>cancel</li>
                      </a>
                      <li className={styles.space}></li>
                    </ul>
                  ) : (
                    <ul
                      className={`${styles.menu} ${isOpen ? styles.show : ""} ${isOpen ? styles.center : ""
                        }`}
                    >
                      <li className={styles.space}>
                        <button value={id} onClick={handleFollow}>
                          {isFollowing.includes(true) ? "Unfollow" : "Follow"}
                        </button>{" "}
                      </li>
                      <li className={styles.space}>
                        <button>Report</button>{" "}
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.sections}>
              <div className={styles.separators}>{"separators"}</div>
              <div
                className={`${selected === 0 ? styles.selected : styles.review
                  }`}
                onClick={() => handleSelect(0)}
              >
                <img src={star} alt="star" width="24px" height="24px" /> Reviews
              </div>
              <div
                className={`${selected === 1 ? styles.selected : styles.places
                  }`}
                onClick={() => handleSelect(1)}
              >
                <img src={pin} alt="star" width="24px" height="24px" />
                Places I've been
              </div>
              <div className={styles.separators}>{"separators"}</div>
            </div>
            <hr />
            <div className={styles.cardReviewContainer}>
              {/* {myPublications &&
                selected === 0 &&
                myPublications.map((e: any) => (
                  <div className={styles.cardReview}>
                    <img src={img} alt="" />
                    <h4>{e.clasification}</h4>
                    <Rating
                      initialValue={e.rate}
                      readonly
                      fillColorArray={[
                        "#5847A6",
                        "#5847A6",
                        "#5847A6",
                        "#5847A6",
                        "#5847A6",
                        "#5847A6",
                      ]}
                      size={20}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  </div>
                ))} */}
            </div>

            <div className={styles.containerMapa}>
              <div className={styles.color}>
                {selected === 1 && <div className={styles.mapa}></div>}
              </div>
            </div>
          </div>
          <div className={styles.footerTerm}>
            <FooterTerm />
          </div>
        </div>
      </div>
      <ChatBubble UserChatActual={UserChatActual} />
    </div>
  );
}
