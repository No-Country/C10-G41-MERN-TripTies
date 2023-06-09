import { Rating } from "react-simple-star-rating";
import style from "../../styles/SinglePublication/SinglePublication.module.css";
import SlideShow from "../SlideShow/SlideShow";
import coffee from "../../img/coffee.png";
import location from "../../img/smallPin.png";
import tagPlace from "../../img/tag.png";
import boldHeart from "../../img/heart-circle-bold.png";
import message from "../../img/message-text.png";
import cross from "../../img/cross.png";
import { postComment, postLike } from "../../redux/actions/Publications";
import { useAppDispatch } from "../../redux/store/hooks";
import { useState } from "react";
import Comments from "../Comments/Comments";

function SinglePublication({
  openPost,
  setOpenPost,
  media,
  places,
  day,
  time,
  profile,
}: any): JSX.Element {
  const dispatch = useAppDispatch();

  const [displayComments, setDisplayComments] = useState("none");

  const handleComment = () => {
    if (displayComments === "none") {
      setDisplayComments("block");
    } else {
      setDisplayComments("none");
    }
  };

  return (
    <div className={style.modalContainer}>
      {openPost && (
        <section className={style.modal}>
          <div className={style.container}>
            <div className={style.containerLeft}>
              <SlideShow media={media} />
            </div>
            <div className={style.containerRight}>
              <section className={style.containerImg}>
                <img src={places.user?.photoUser} alt="" />
              </section>
              <div className={style.infoUserContainer}>
                <div className={style.infoUser}>
                  <section className={style.infoNav}>
                    <section>
                      <h5>
                        {places.user?.firstName} {places.user?.lastName}
                      </h5>
                      <h6>
                        {day} {time}
                      </h6>
                    </section>
                    <label
                      onClick={() => setOpenPost(false)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={cross} alt="" width={20} height={20} />
                    </label>
                  </section>
                </div>
                <div className={style.contentCard}>
                  <p>{places.content}.</p>
                </div>
                <p>{places.tag.join(" ")}</p>
                <div className={style.userInfo}>
                  <aside>
                    <Rating initialValue={places.rate} readonly size={30} />
                  </aside>
                  <aside>
                    <img src={tagPlace} alt="" />
                    {places.name}
                  </aside>
                  <aside>
                    <img src={coffee} alt="" />
                    {places.clasification}
                  </aside>
                  <aside>
                    <img src={location} alt="" />
                    {places.location}
                  </aside>
                </div>
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
                <div className={style.Commentsection}>
                  <section>
                    <h3>Comentar</h3>
                    <img src={message} onClick={handleComment} />
                  </section>
                  <Comments
                    profile={profile}
                    goingToComment={displayComments}
                    places={places}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default SinglePublication;
