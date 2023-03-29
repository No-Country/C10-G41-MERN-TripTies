import React from "react";
import style from "../../styles/Home/Home.module.css";
import profile from "../../img/profileImage.png";
import edit from "../../img/edit.png";
import gallery from "../../img/gallery.png";
import location from "../../img/location.png";
import video from "../../img/video.png";
import NavBar from "../NavBar/NavBar";
import SectionDiscover from "../SectionDiscover/SectionDiscover";

function Home(): JSX.Element {
  return (
    <div className={style.homeContainer}>
      <NavBar />
      <div className={style.feedContainer}>
        <div className={style.feedLeft}></div>
        <div className={style.feedCenter}>
          <div className={style.postGenerator}>
            <img src={profile} alt="Perfil" className={style.imgProfile} />
            <div className={style.buttonsPost}>
              <input
                type="text"
                className={style.inputPost}
                placeholder="Create a new post"
              />
              <div className={style.icons}>
                <img src={gallery} alt="Open gallery" />

                <img src={video} alt="Add video" />

                <img src={location} alt="Add your location" />
              </div>
            </div>
          </div>
          <div className={style.feedPublications}></div>
        </div>
        <div className={style.feedRight}>
          <SectionDiscover />
        </div>
      </div>
    </div>
  );
}

export default Home;
