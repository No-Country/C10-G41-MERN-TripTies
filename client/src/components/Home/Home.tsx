import React, { useEffect, useState } from "react";
import style from "../../styles/Home/Home.module.css";
import profile from "../../img/profileImage.png";
import edit from "../../img/edit.png";
import gallery from "../../img/gallery.png";
import location from "../../img/location.png";
import video from "../../img/video.png";
import NavBar from "../NavBar/NavBar";
import SectionDiscover from "../SectionDiscover/SectionDiscover";
import Account from "./Accout";
import Card from "../Card/Card";

interface HashTagTypes {
  id: number;
  tag: string;
}

const hashTag: HashTagTypes[] = [
  {
    id: 1,
    tag: "#Paris",
  },
  {
    id: 2,
    tag: "#Vietnam",
  },
  {
    id: 3,
    tag: "#Madrid",
  },
  {
    id: 4,
    tag: "#BarHoppingAmsterdam",
  },
  {
    id: 5,
    tag: "#VisitCostaRica",
  },
];

const lugares = [
  {
    lugar: "Torre Eiffel",
    tag: "#Paris",
  },
  {
    lugar: "Museo Luvre",
    tag: "#Paris",
  },
  {
    lugar: "Santiago Bernabeu",
    tag: "#Madrid",
  },
  {
    lugar: "Túneles de Cuchi",
    tag: "#Vietnam",
  },
  {
    lugar: "Túneles de Cuchi",
    tag: "#Vietnam",
  },
  {
    lugar: "Túneles de Cuchi",
    tag: "#Vietnam",
  },
  {
    lugar: "Túneles de Cuchi",
    tag: "#Vietnam",
  },
  {
    lugar: "Túneles de Cuchi",
    tag: "#Vietnam",
  },
  {
    lugar: "Túneles de Cuchi",
    tag: "#Vietnam",
  },
];
function Home(): JSX.Element {
  let [hash, setHash] = useState("");

  const handleHash = (e: any) => {
    e.preventDefault();
    setHash(e.target.value);
  };

  const tagLugares = lugares && lugares.filter((e) => e.tag.includes(hash));

  return (
    <div className={style.homeContainer}>
      <NavBar />
      <div className={style.feedContainer}>
        <div className={style.feedLeft}>
          <Account />
        </div>
        <div className={style.feedCenter}>
          <div className={style.postGenerator}>
            <img src={profile} alt="Perfil" className={style.imgProfile} />
            <div className={style.buttonsPost}>
              <input
                type="text"
                className={style.inputPost}
                placeholder="Create a new post"
              />
              <section className={style.icons}>
                <div className={style.iconsTitle}>
                  <img src={gallery} alt="Open gallery" />
                  <h4>Add Photo</h4>
                </div>
                <div className={style.iconsTitle}>
                  <img src={video} alt="Add video" />
                  <h4>Add Video</h4>
                </div>
              </section>
            </div>
          </div>
          <div className={style.feedPublications}>
            <Card/>
            {tagLugares &&
              tagLugares.map((e, i) => (
                <div key={i}>
                  <h1>{e.lugar}</h1>
                </div>
              ))} 
          </div>
        </div>
        <div className={style.feedRight}>
          <SectionDiscover hashTag={hashTag} handleHash={handleHash} />
        </div>
      </div>
    </div>
  );
}

export default Home;
