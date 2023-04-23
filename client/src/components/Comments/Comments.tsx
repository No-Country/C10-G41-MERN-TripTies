import React, { useState } from "react";
import style from "../../styles/Comments/Comments.module.css";
import send from "../../img/message-add.png";
import user from "../../img/user.png";
import { postComment } from "../../redux/actions/Publications";
import { useAppDispatch } from "../../redux/store/hooks";

function Comments({ goingToComment, profile, places }: string | any) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([...comment]);
  const dispatch = useAppDispatch();
  const id = places._id;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (comment) {
      //dispatch(postComment({comment, id}))
      setComments((prevComment) => [...prevComment, comment]);
      setComment("");
    }
  };

  const handleDelete = (event: any) => {
    const i = comments.indexOf(event.target.value);
    setComments(
      comments.filter((comment, index) => comment[index] !== comment[i])
    );
  };

  return (
    <div className={style.container} style={{ display: goingToComment }}>
      {comments
        ? comments.map((comment, index) => (
            <article key={index} className={style.commentCont}>
              <p className={style.comment}>{comment}</p>
              <img
                src={profile.photoUser === "" ? user : profile.photoUser}
                alt="avatar"
              />
              <button value={comment} onClick={(event) => handleDelete(event)}>
                ✘
              </button>
            </article>
          ))
        : null}
      <form onSubmit={(e) => handleSubmit(e)} className={style.commentForm}>
        <input
          name="comment"
          id="comment"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          type="text"
          placeholder="Comment..."
        />
        <button type="submit">
          <img src={send} alt="send" />
        </button>
      </form>
    </div>
  );
}

export default Comments;
