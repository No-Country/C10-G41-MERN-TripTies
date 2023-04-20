import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Card/Card.module.css";
import avatar from "../../img/avatar.png";
import user from "../../img/user.png";
import menuVertical from "../../img/menu-vertical.png";
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

  const handleSave = (e: any) => {
    if (saved === false) {
      Swal.fire({
        title: "Publications saved!",
        icon: "success",
      }).then(() => {
        dispatch(
          savePublications({
            postId: e.target.value,
            userId: cookies.get("idUser"),
          })
        ).then(() => dispatch(getUserById()));
      });
    } else {
      Swal.fire({
        title: "Publications unsaved!",
        icon: "error",
      }).then(() => {
        dispatch(
          savePublications({
            postId: e.target.value,
            userId: cookies.get("idUser"),
          })
        ).then(() => dispatch(getUserById()));
      });
    }
  };

  return (
    <>
      <section className={style.container}>
        <img
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
                onClick={handleAppear}
                className={style.dotMenu}
                src={menuVertical}
                alt="dots menu"
              />
              <Dropdown
                name={places.user}
                login={login}
                profile={profile}
                display={display}
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

            {saved === true ? (
              <label htmlFor={places._id}>
                <img src={postSaved} alt="" />
                <input
                  type="button"
                  id={places._id}
                  value={places._id}
                  onClick={handleSave}
                />
              </label>
            ) : (
              <label htmlFor={places._id}>
                <img src={postUnsaved} alt="" />
                <input
                  type="button"
                  id={places._id}
                  value={places._id}
                  onClick={handleSave}
                />
              </label>
            )}
          </div>
        </section>
      </section>
      <Comments profile={profile} goingToComment={displayComments} />
    </>
  );
}

export default Card;
