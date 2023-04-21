import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Card/Card.module.css";
import avatar from "../../img/avatar.png";
import user from "../../img/user.png";
import open from "../../img/open.png";
import coffee from "../../img/coffee.png";
import location from "../../img/smallPin.png";
import tagPlace from "../../img/tag.png";
import londonCoffee from "../../img/coffeLondon.png";
import boldHeart from "../../img/heart-circle-bold.png";
import message from "../../img/message-text.png";
import messageBig from "../../img/bigMessageText.png";
import share from "../../img/send-2.png";
import heart from "../../img/heart-circle.png";
import postUnsaved from "../../img/archive-tick-none.png";
import postSaved from "../../img/archive-tick.png";
import stars from "../../img/stars.png";
import Dropdown from "./Dropdown";
import SlideShow from "../SlideShow/SlideShow";
import { Rating } from "react-simple-star-rating";
import Comments from "../Comments/Comments";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  getProfileUser,
  getUserById,
  savePublications,
} from "../../redux/actions/Users";
import { Cookie } from "universal-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SinglePublication from "../SinglePublication/SinglePublication";

type props = {
  places: any;
  login: string;
  profile: object;
  cookies: Cookie;
};
function Card({ places, login, profile, cookies }: props) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const nav = useNavigate();
  const [openPost, setOpenPost] = useState(false);
  const [display, setDisplay] = useState("none");
  const [displayComments, setDisplayComments] = useState("none");
  const ref = useRef<HTMLDivElement>(null);

  const tags = places.tag?.map((e: string) => e);

  const user = selector<any>((state) => state.user);

  //Save publications
  let saved = user.user?.saved.includes(places._id);

  //Format date
  let dateOfPublications = new Date(places.createdAt);
  let dayMonthYear = dateOfPublications.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let minutesSeconds = dateOfPublications.toLocaleTimeString("en-GB");

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  const handleAppear = () => {
    if (display === "none" && login === "true") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  const handleSectionComments = () => {
    if (displayComments === "none") {
      setDisplayComments("block");
    } else {
      setDisplayComments("none");
    }
  };

  const handleOpen = () => {
    setOpenPost(!openPost);
  };

  return (
    <>
      <SinglePublication
        openPost={openPost}
        setOpenPost={setOpenPost}
        media={[places.photoPost, places.video]}
        places={places}
        day={dayMonthYear}
        time={minutesSeconds}
      />
      <section className={style.container}>
        <img
          className={style.userPhoto}
          src={places.user?.photoUser}
          alt="avatar"
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
        <section className={style.content}>
          <div className={style.userInfo}>
            <aside>
              <Link to={`/profile/${places.user.id}`}>
                <h4 className={style.name}>
                  {places.user?.firstName} {places.user?.lastName}
                </h4>
              </Link>

              <span>
                {dayMonthYear} at {minutesSeconds}
              </span>
            </aside>
            <div ref={ref}>
              <img
                width="20px"
                height="20px"
                onClick={handleOpen}
                className={style.dotMenu}
                src={open}
                alt="dots menu"
              />
            </div>
          </div>
          <article>
            <p className={style.description}>
              {places.content}. {places.tag}
            </p>
          </article>
          <div className={style.publicationInfo}>
            <aside>
              <Rating
                initialValue={places.rate}
                readonly
                fillColorArray={[
                  "#31135e",
                  "#31135e",
                  "#31135e",
                  "#31135e",
                  "#31135e",
                  "#31135e",
                ]}
                size={20}
              />
            </aside>
            <aside>
              <img src={coffee} alt="coffe" />
              <span>{places.clasification}</span>
            </aside>
            <aside>
              <img src={location} alt="location" />
              <span>{places.location}</span>
            </aside>
            <aside>
              <img src={tagPlace} alt="Place" />
              <span>{places.name}</span>
            </aside>
          </div>
          <SlideShow media={[places.photoPost, places.video]} />
          <div className={style.likesAndComments}>
            <aside>
              <img src={boldHeart} alt="bold heart" />
              <span>{places.liked}</span>
            </aside>
            <aside>
              <img src={message} alt="message" />
              <span>{places.comments}</span>
            </aside>
          </div>
          <div className={style.actions}>
            <aside>
              <img src={heart} alt="heart" />
              <img
                onClick={handleSectionComments}
                src={messageBig}
                alt="message"
              />
              <img src={share} alt="share" />
            </aside>
          </div>
        </section>
      </section>
      <Comments profile={profile} goingToComment={displayComments} />
    </>
  );
}

export default Card;
