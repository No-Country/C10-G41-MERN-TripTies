import React, { useEffect, useState } from "react";
import style from "../../styles/Home/Home.module.css";
import profile from "../../img/profileImage.png";
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

interface lugaresType {
  name: string;
  time: string;
  place: string;
  photo: string;
  description: string;
  stars: string;
  attraction: string;
  location: string;
  likes: number;
  comments: number;
  tag: string;
  save: string;
}

function Home(): JSX.Element {
  let [hash, setHash] = useState("");

  const lugares = [
    {
      name: "Julio Humere",
      time: "3 hours ago",
      place: "Torre Eiffel",
      photo:
        "https://img.asmedia.epimg.net/resizer/QbgIKPOqmxvtzkusQK-P-C_yD5Q=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/7FLYNLT7ZZLDJCQ6DYMZO2KXTQ.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars3,
      attraction: "heigth & funny",
      location: "Paris, France",
      likes: 34,
      comments: 12,
      tag: "#Paris",
      save: "Unsaved",
    },
    {
      name: "Edgard Pazos",
      time: "1 hours ago",
      place: "Museo Louvre",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars2,
      attraction: "interested & art",
      location: "Paris, France",
      likes: 56,
      comments: 32,
      tag: "#Paris",
      save: "Saved",
    },
    {
      name: "Jose Castro",
      time: "12 hours ago",
      place: "Santiago Bernabeu",
      photo:
        "https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/madrid/estadio-bernabeu-vista-aerea-c-turismo-madrid.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars1,
      attraction: "funny & sports",
      location: "Madrid, Spain",
      likes: 83,
      comments: 49,
      tag: "#Madrid",
      save: "Unsaved",
    },
    {
      name: "Nazarena Prieto",
      time: "20 hours ago",
      place: "Tuneles de Cuchi",
      photo:
        "https://media-cdn.tripadvisor.com/media/photo-s/0a/78/2b/b2/inside-of-tunnel.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars1,
      attraction: "older & history",
      location: "Ciudad Ho Chi Minh, Vietnam",
      likes: 1,
      comments: 2,
      tag: "#Vietnam",
      save: "Unsaved",
    },
    {
      name: "Nazarena Prieto",
      time: "20 hours ago",
      place: "La Bombonera",
      photo: "https://statics.eleconomista.com.ar/2023/03/64062d3073bd9.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars3,
      attraction: "sports & history",
      location: "Buenos Aires, Argentina",
      likes: 1000,
      comments: 200,
      tag: "#Argentina",
      save: "Saved",
    },
  ];

  const saved = [
    {
      name: "Edgar Pazos",
      time: "1 hours ago",
      place: "Museo Louvre",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars2,
      attraction: "interested & art",
      location: "Paris, France",
      likes: 56,
      comments: 32,
      tag: "#Paris",
      save: "Saved",
    },
    {
      name: "Nazarena Prieto",
      time: "20 hours ago",
      place: "La Bombonera",
      photo: "https://statics.eleconomista.com.ar/2023/03/64062d3073bd9.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars3,
      attraction: "sports & history",
      location: "Buenos Aires, Argentina",
      likes: 1000,
      comments: 200,
      tag: "#Argentina",
      save: "Saved",
    },
  ];

  const Visited = [
    {
      name: "Julio Humere",
      time: "3 hours ago",
      place: "Torre Eiffel",
      photo:
        "https://img.asmedia.epimg.net/resizer/QbgIKPOqmxvtzkusQK-P-C_yD5Q=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/7FLYNLT7ZZLDJCQ6DYMZO2KXTQ.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vero placeat optio aliquam blanditiis eligendi officia culpa ad iusto magni doloribus, commodi assumenda sit amet, animi nisi, nobis corporis ab libero rerum voluptatibus in inventore repellendus consequuntur! Ducimus doloremque enim dolorum doloribus aut, consequatur nobis molestiae delectus necessitatibus aliquid laboriosam.",
      stars: stars3,
      attraction: "heigth & funny",
      location: "Paris, France",
      likes: 34,
      comments: 12,
      tag: "#Paris",
      save: "Unsaved",
    },
  ];

  const handleHash = (e: any) => {
    e.preventDefault();
    setHash(e.target.value);
  };

  const tagLugares = lugares && lugares.filter((e) => e.tag.includes(hash));

  const tagLugaresSaved = saved && saved.filter((e) => e.tag.includes(hash));

  const tagLugaresVisited =
    Visited && Visited.filter((e) => e.tag.includes(hash));

  let [publications, setPublications] = useState(true);
  let [publicationsSaved, setPublicationSaved] = useState(false);
  let [publicationsVisited, setPublicationsVisited] = useState(false);

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

  return (
    <div className={style.homeContainer}>
      <NavBar />
      <div className={style.feedContainer}>
        <div className={style.feedLeft}>
          <SectionAccount
            handleSaved={handleSaved}
            handleVisited={handleVisited}
          />
          <SectionChat />
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
            {(publications &&
              tagLugares &&
              tagLugares.map((e, i) => <Card places={e} />)) ||
              (publicationsSaved &&
                tagLugaresSaved &&
                tagLugaresSaved.map((e, i) => <Card places={e} />)) ||
              (publicationsVisited &&
                tagLugaresVisited &&
                tagLugaresVisited.map((e, i) => <Card places={e} />))}
          </div>
        </div>
        <div className={style.feedRight}>
          <SectionDiscover
            publications={publications}
            publicationsSaved={publicationsSaved}
            publicationsVisited={publicationsVisited}
            hashTag={tagLugares}
            hashTagSaved={tagLugaresSaved}
            hashTagVisited={tagLugaresVisited}
            handleHash={handleHash}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
