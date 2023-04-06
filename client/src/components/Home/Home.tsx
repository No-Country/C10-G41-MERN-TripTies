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
import PlaceIVisited from "../PlaceIVisited/PlaceIVisited";
import SectionSuggestions from "../SectionSuggestions/SectionSuggestions";
import FooterTerm from "../Footers/FooterTerm";
import FooterSocial from "../Footers/FooterSocial";
import MiniFooter from "../MiniFooter/MiniFooter";
import SlideShow from "../SlideShow/SlideShow";
import ModalPost from "../ModalPost/ModalPost";

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

function Home(): JSX.Element {
  let [hash, setHash] = useState("");

  const places = [
    {
      name: "Julio Humere",
      time: "3 hours ago",
      place: "Torre Eiffel",
      photo: [
        {
          url: "https://img.asmedia.epimg.net/resizer/QbgIKPOqmxvtzkusQK-P-C_yD5Q=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/7FLYNLT7ZZLDJCQ6DYMZO2KXTQ.jpg",
          type: "image",
        },
      ],
      video: [],
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
      photo: [
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg",
          type: "image",
        },
      ],
      video: [],
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
      photo: [
        {
          url: "https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/madrid/estadio-bernabeu-vista-aerea-c-turismo-madrid.jpg",
          type: "image",
        },
      ],
      video: [],
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
      photo: [
        {
          url: "https://media-cdn.tripadvisor.com/media/photo-s/0a/78/2b/b2/inside-of-tunnel.jpg",
          type: "image",
        },
      ],
      video: [],
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
      photo: [
        {
          url: "https://statics.eleconomista.com.ar/2023/03/64062d3073bd9.png",
          type: "image",
        },
        {
          url: "https://media.tycsports.com/files/2023/02/16/535189/foto-bombonera_862x485_wmk.webp?v=7",
          type: "image",
        },
        {
          url: "https://fotos.perfil.com/2023/04/02/trim/720/410/bombonera-1539489.jpg",
          type: "image",
        },
      ],
      video: [
        {
          url: "https://res.cloudinary.com/dtpsfvnfo/video/upload/v1680545377/prueba_video_uzwzph.mp4",
          type: "video",
        },

        {
          url: "https://res.cloudinary.com/dtpsfvnfo/video/upload/v1680546131/prueba_video_2_tsjgxk.mp4",
          type: "video",
        },
      ],

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
      photo: [
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg",
          type: "image",
        },
      ],
      video: [],
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
      photo: [
        "https://statics.eleconomista.com.ar/2023/03/64062d3073bd9.png",

        "https://media.tycsports.com/files/2023/02/16/535189/foto-bombonera_862x485_wmk.webp?v=7",

        "https://www.ole.com.ar/2020/05/25/G_THA0PzV_860x575__1.jpg",
      ],
      video: [
        "https://res.cloudinary.com/dtpsfvnfo/video/upload/v1680545377/prueba_video_uzwzph.mp4",

        "https://res.cloudinary.com/dtpsfvnfo/video/upload/v1680546131/prueba_video_2_tsjgxk.mp4",
      ],
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
      photo: [
        "https://img.asmedia.epimg.net/resizer/QbgIKPOqmxvtzkusQK-P-C_yD5Q=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/7FLYNLT7ZZLDJCQ6DYMZO2KXTQ.jpg",
      ],
      video: [],
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

  const [visible, setVisible] = useState(false);

  const handleHash = (e: any) => {
    e.preventDefault();
    setHash(e.target.value);
  };

  const tagPlaces = places && places.filter((e) => e.tag.includes(hash));

  const tagPlacesSaved = saved && saved.filter((e) => e.tag.includes(hash));

  const tagPlacesVisited =
    Visited && Visited.filter((e) => e.tag.includes(hash));

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

  return (
    <div className={style.homeContainer}>
      <NavBar handleHome={handleHome} places={places} />
      <div className={style.feedContainer}>
        <div className={style.leftContainer}>
          <div>
            <div className={style.feedLeft}>
              <SectionAccount
                handleSaved={handleSaved}
                handleVisited={handleVisited}
              />
              <SectionChat />
            </div>
          </div>
          <div className={style.footerLeft}>
            <FooterSocial />
          </div>
        </div>

        <div className={style.feedCenter}>
          <ModalPost visible={visible} setVisible={setVisible} />
          <div className={style.postGenerator}>
            <img src={profile} alt="Perfil" className={style.imgProfile} />
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
            {(publications &&
              tagPlaces &&
              tagPlaces.map((e, i) => <Card places={e} key={i} />)) ||
              (publicationsSaved && <Saved place={tagPlacesSaved} />) ||
              (publicationsVisited && (
                <PlaceIVisited visited={tagPlacesVisited} />
              ))}
          </div>
        </div>
        <div className={style.rigthcontainer}>
          <div className={style.feedRight}>
            <SectionDiscover
              publications={publications}
              publicationsSaved={publicationsSaved}
              publicationsVisited={publicationsVisited}
              hashTag={tagPlaces}
              hashTagSaved={tagPlacesSaved}
              hashTagVisited={tagPlacesVisited}
              handleHash={handleHash}
            />
            <SectionSuggestions />
          </div>
          <div className={style.footerrigth}>
            <FooterTerm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
