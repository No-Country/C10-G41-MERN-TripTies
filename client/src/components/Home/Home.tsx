import React, { useEffect, useState } from "react";
import style from "../../styles/Home/Home.module.css";
import imgProfile from "../../img/profileImage.png";
import edit from "../../img/edit.png";
import gallery from "../../img/gallery.png";
import location from "../../img/location.png";
import video from "../../img/video.png";
import NavBar from "../NavBar/NavBar";
import SectionDiscover from "../SectionDiscover/SectionDiscover";
import SectionAccount from "../Section Account/SectionAccout";
import Card from "../Card/Card";
import stars1 from "../../img/stars1.png";
import stars2 from "../../img/stars2.png";
import stars3 from "../../img/stars3.png";

import SectionChat from "../SectionChat/SectionChat";
import Saved from "../Saved/Saved";
import PlaceIVisited from "../PlaceIVisited/PlaceIVisited";
import SectionSuggestions from "../SectionSuggestions/SectionSuggestions";
import FooterTerm from "../Footers/FooterTerm";
import FooterSocial from "../Footers/FooterSocial";
import MiniFooter from "../MiniFooter/MiniFooter";
import SlideShow from "../SlideShow/SlideShow";
import ChatBubble from "../ChatBubble/ChatBubble";
import ModalPost from "../ModalPost/ModalPost";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { getAllPublications } from "../../redux/actions/Publications";
import Cookies from "universal-cookie";
import { Profile } from "../../types";
import { getProfileUser } from "../../redux/actions/Users";
import { useNavigate } from "react-router-dom";

interface lugaresType {
  name: string;
  time: string;
  place: string;
  photo: string[];
  video: string[];
  description: string;
  stars: string;
  attraction: string;
  location: string;
  likes: number;
  comments: number;
  tag: string;
  save: string;
}

interface chat {
  name: string;
  avatar: string;
}

function Home(): JSX.Element {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  let [hash, setHash] = useState("");
  const allPublications = selector<any>((state) => state.publications);
  const profile: Profile = selector((state) => state.profile);
  const cookies = new Cookies();
  const login = cookies.get("login");
  const visit = cookies.get("visit");

  useEffect(() => {
    if (login === "true" || visit === "true") {
      dispatch(getAllPublications());
      dispatch(getProfileUser());
    } else {
      nav("/");
    }
  }, [login, visit]);

  const [visible, setVisible] = useState(false);

  const handleHash = (e: any) => {
    e.preventDefault();
    setHash(e.target.value);
  };

  // const tagPlaces = places && places.filter((e) => e.tag.includes(hash));

  // const tagPlacesSaved = saved && saved.filter((e) => e.tag.includes(hash));

  // const tagPlacesVisited =
  //   Visited && Visited.filter((e) => e.tag.includes(hash));

  let [publications, setPublications] = useState(true);
  let [publicationsSaved, setPublicationSaved] = useState(false);
  let [publicationsVisited, setPublicationsVisited] = useState(false);

  const handleHome = (e: any) => {
    e.preventDefault();
    if (publications === false) {
      setPublications(true);
      setPublicationSaved(false);
      setPublicationsVisited(false);
    }
    setHash("");
  };

  const handleSaved = (e: any) => {
    e.preventDefault();
    if (publicationsSaved === false) {
      setPublicationSaved(true);
      setPublicationsVisited(false);
      setPublications(false);
    }
  };

  const handleVisited = (e: any) => {
    e.preventDefault();
    if (publicationsVisited === false) {
      setPublicationsVisited(true);
      setPublicationSaved(false);
      setPublications(false);
    }
  };

  // necesario para la implementacion del chat
  const [chat, setChat] = useState<chat>({ name: "", avatar: "" });

  return (
    <div className={style.homeContainer}>
      <NavBar
        handleHome={handleHome}
        user={allPublications}
        profile={profile}
        login={login}
        visit={visit}
      />
      <div className={style.feedContainer}>
        <div className={style.leftContainer}>
          <div>
            <div className={style.feedLeft}>
              <SectionAccount
                handleSaved={handleSaved}
                handleVisited={handleVisited}
              />
              <SectionChat chat={chat} setChat={setChat} />
            </div>
          </div>
          <div className={style.footerLeft}>
            <FooterSocial />
          </div>
        </div>

        <div className={style.feedCenter}>
          <ModalPost
            visible={visible}
            setVisible={setVisible}
            profile={profile}
          />
          <div className={style.postGenerator}>
            <img src={imgProfile} alt="Perfil" className={style.imgProfile} />
            <div className={style.buttonsPost}>
              <input
                type="text"
                className={style.inputPost}
                placeholder="Create a new post"
                onClick={() => setVisible(true)}
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
            {allPublications &&
              allPublications.posts?.map((e: any, i: number) => (
                <Card places={e} login={login} profile={profile} key={i} />
              ))}
          </div>
        </div>
        <div className={style.rigthcontainer}>
          <div className={style.feedRight}>
            <SectionDiscover
              publications={publications}
              publicationsSaved={publicationsSaved}
              publicationsVisited={publicationsVisited}
              handleHash={handleHash}
              hashTag={undefined}
              hashTagSaved={undefined}
              hashTagVisited={undefined}
            />
            <SectionSuggestions />
            <div className={style.footerrigth}>
              <FooterTerm />
            </div>
          </div>
        </div>
      </div>
      <ChatBubble chat={chat} setChat={setChat} />
    </div>
  );
}

export default Home;
