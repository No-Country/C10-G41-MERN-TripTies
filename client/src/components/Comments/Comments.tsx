import { useState } from "react";
import style from "../../styles/Comments/Comments.module.css";
import send from "../../img/message-add.png";
import user from "../../img/user.png";
import { postComment } from "../../redux/actions/Publications";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { AiFillDelete } from "react-icons/ai";

function Comments({ goingToComment, profile, places, id }: string | any) {
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([...comment]);
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const comments = selector((state) => state.comments);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(postComment({ comment, id }));
    // if (comment) {

    //   setComments((prevComment) => [...prevComment, comment]);
    //   setComment("");
    // }
  };

  // const handleDelete = (event: any) => {
  //   const i = comments.indexOf(event.target.value);
  //   setComments(
  //     comments.filter((comment, index) => comment[index] !== comment[i])
  //   );
  // };

  return (
    <div className={style.container} style={{ display: goingToComment }}>
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
      {comments
        ? comments?.map((comment: any, index: number) => (
            <div className={style.commentContainer} key={index}>
              <section className={style.commentsTitle}>
                <img
                  src={profile.photoUser === "" ? user : profile.photoUser}
                  alt="avatar"
                />
                <h5>
                  {profile.first_name} {profile.last_name}
                </h5>
              </section>
              <section className={style.commentsText}>
                <p className={style.comment}>{comment.content}</p>
                <button // value={comment.content}
                // onClick={(event) => handleDelete(event)}
                >
                  <AiFillDelete width="20" height="20" />
                </button>
              </section>
            </div>
          ))
        : null}
    </div>
  );
}

export default Comments;
