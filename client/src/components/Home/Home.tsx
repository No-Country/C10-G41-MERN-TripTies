import { useEffect, useState } from "react";
import style from "../../styles/Home/Home.module.css";
import imgProfile from "../../img/profileImage.png";
import gallery from "../../img/gallery.png";
import video from "../../img/video.png";
import NavBar from "../NavBar/NavBar";
import SectionDiscover from "../SectionDiscover/SectionDiscover";
import SectionAccount from "../Section Account/SectionAccout";
import Card from "../Card/Card";
import SectionChat from "../SectionChat/SectionChat";
import PlaceIVisited from "../PlaceIVisited/PlaceIVisited";
import SectionSuggestions from "../SectionSuggestions/SectionSuggestions";
import FooterTerm from "../Footers/FooterTerm";
import FooterSocial from "../Footers/FooterSocial";
import ChatBubble from "../ChatBubble/ChatBubble";
import ModalPost from "../ModalPost/ModalPost";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { getAllPublications, getTags } from "../../redux/actions/Publications";
import Cookies from "universal-cookie";
import { Profile } from "../../types";
import { getProfileUser, getUserById } from "../../redux/actions/Users";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import PageLoading from "../Page Loading/PageLoading";
import Swal from "sweetalert2";

function Home(): JSX.Element {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  //Cookies
  const cookies = new Cookies();
  const login = cookies.get("login");
  const visit = cookies.get("visit");
  const firstLoading = cookies.get("fisrtLoading");

  //States of Redux
  const allPublications = selector<any>((state) => state.publications);
  const profile: Profile = selector((state) => state.profile);
  const user = selector((state) => state.user);
  const tags = selector<any>((state) => state.tags);

  //States of component
  const [loadingHome, setLoadingHome] = useState(true);
  const [loadingPublication, setLoadingPublications] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [render, setRender] = useState("all");
  let [publications, setPublications] = useState("");
  const [visible, setVisible] = useState(false);

  //Handles
  const handleHome = (e: any) => {
    setRender("all");
  };

  const handleOpen = () => {
    if (login === "true") {
      cookies.set("visit", false);
      setVisible(true);
      setLoadingModal(true);
      setTimeout(() => {
        setLoadingModal(false);
      }, 1500);
    } else {
      Swal.fire({
        title: "For write a publications, you should login to page",
        text: "You will be redirected to the login page, do you agree?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, come on!",
        cancelButtonText: "Continue how visitor!",
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/register");
        }
      });
    }
  };

  //InitialState of component
  useEffect(() => {
    dispatch(getAllPublications());
    dispatch(getUserById());
    dispatch(getProfileUser(undefined));
    dispatch(getTags());
    setTimeout(() => {
      cookies.remove("fisrtLoading");
      setLoadingHome(false);
    }, 3000);
  }, []);

  const [UserChatActual, setUserChatActual] = useState({});

  console.log(allPublications.posts);

  return firstLoading === "true" ? (
    <PageLoading />
  ) : (
    <div className={style.homeContainer}>
      <NavBar
        handleHome={handleHome}
        user={user}
        login={login}
        visit={visit}
        setRender={setRender}
      />
      <div className={style.feedContainer}>
        <div className={style.leftContainer}>
          <div>
            <div className={style.feedLeft}>
              <SectionAccount />
              <SectionChat setUserChatActual={setUserChatActual} />
            </div>
          </div>
          <div className={style.footerLeft}>
            <FooterSocial />
          </div>
        </div>

        <div className={style.feedCenter}>
          <ModalPost
            visible={visible}
            login={login}
            setVisible={setVisible}
            profile={profile}
            tags={tags.tags}
            loadingModal={loadingModal}
            setLoadingModal={setLoadingModal}
          />
          <div className={style.postGenerator}>
            <img src={imgProfile} alt="Perfil" className={style.imgProfile} />
            <div className={style.buttonsPost}>
              <input
                type="text"
                className={style.inputPost}
                placeholder="Create a new post"
                onClick={handleOpen}
              />
              <section className={style.icons}>
                <button className={style.iconsTitle}>
                  <img src={gallery} alt="Open gallery" />
                  <h4>Add Photo</h4>
                </button>
                <button className={style.iconsTitle}>
                  <img src={video} alt="Add video" />
                  <h4>Add Video</h4>
                </button>
              </section>
            </div>
          </div>
          <div className={style.feedPublications}>
            {loadingPublication ? (
              <Loading />
            ) : (
              allPublications &&
              allPublications.posts?.map((e: any, i: number) => (
                <Card
                  places={e}
                  login={login}
                  profile={profile}
                  cookies={cookies}
                  key={i}
                />
              ))
            )}
          </div>
        </div>
        <div className={style.rigthcontainer}>
          <div className={style.feedRight}>
            <SectionDiscover
              setLoading={setLoadingPublications}
              tags={tags}
              setPublications={setPublications}
              setRender={setRender}
            />
            <SectionSuggestions />
            <div className={style.footerrigth}>
              <FooterTerm />
            </div>
          </div>
        </div>
      </div>
      <ChatBubble UserChatActual={UserChatActual} />
    </div>
  );
}

export default Home;
