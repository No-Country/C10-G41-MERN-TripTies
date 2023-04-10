import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Card/Card.module.css";
import avatar from "../../img/avatar.png";
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
import unsaved from "../../img/archive-tick-none.png";
import saved from "../../img/archive-tick.png";
import stars from "../../img/stars.png";
import Dropdown from "./Dropdown";
import SlideShow from "../SlideShow/SlideShow";
import Comments from "../Comments/Comments";

type props = {
  places: any;
};
function Card({ places }: props) {
  const [display, setDisplay] = useState("none");
  const [displayComments, setDisplayComments] = useState("none")
  const ref = useRef<HTMLImageElement>(null);

  

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
          setDisplay("none");
      }
  };

  document.addEventListener('mousedown', handleOutsideClick);

  return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
  };
  }, [ref])
   

  const handleAppear = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };


  const handleSectionComments = () => {
    if(displayComments === "none"){
      setDisplayComments("block")
    } else {
      setDisplayComments("none")
    }
  }

  return (
    <>
    <section className={style.container}>
      <img src={avatar} alt="avatar" />
      <section className={style.content}>
        <div className={style.userInfo}>
          <aside>
            <h4 className={style.name}>{places.name}</h4>
            <span>{places.time}</span>
          </aside>
          <div>
            <img
              ref={ref}
              onClick={handleAppear}
              className={style.dotMenu}
              src={menuVertical}
              alt="dots menu"
            />
            <Dropdown name={places?.name} display={display} />
          </div>
        </div>
        <article>
          <p className={style.description}>
            {places.description} {places.tag}
          </p>
        </article>
        <div className={style.publicationInfo}>
          <aside>
            <img src={places.stars} alt="stars" />
          </aside>
          <aside>
            <img src={coffee} alt="coffe" />
            <span>{places.attraction}</span>
          </aside>
          <aside>
            <img src={location} alt="location" />
            <span>{places.location}</span>
          </aside>
          <aside>
            <img src={tagPlace} alt="Place" />
            <span>{places.place}</span>
          </aside>
        </div>
        <SlideShow media={[places.photo, places.video]} />
        <div className={style.likesAndComments}>
          <aside>
            <img src={boldHeart} alt="bold heart" />
            <span>{places.likes}</span>
          </aside>
          <aside>
            <img src={message} alt="message" />
            <span>{places.comments}</span>
          </aside>
        </div>
        <div className={style.actions}>
          <aside>
            <img src={heart} alt="heart" />
            <img onClick={handleSectionComments} src={messageBig} alt="message" />
            <img src={share} alt="share" />
          </aside>

          {places.save === "Unsaved" ? (
            <img src={unsaved} alt="" />
          ) : (
            <img src={saved} alt="" />
          )}
        </div>
      </section>
    </section>
      <Comments goingToComment={displayComments} /> 
    </>
  );
}

export default Card;
