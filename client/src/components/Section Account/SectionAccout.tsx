import locationH from "../../img/locationH.png";
import taskAcc from "../../img/taskAcc.png";
import saved from "../../img/saved.png";
import inbox from "../../img/inbox.png";
import style from "../../styles/SectionAccount/Account.module.css";

type props = {
  handleSaved: any;
  handleVisited: any;
};

const SectionAccount = ({ handleSaved, handleVisited }: props) => {
  return (
    <>
      <h3 className={style.titleAccount}>Account</h3>
      <div className={style.containerAccount}>
        <img src={locationH} alt="location" />
        <button onClick={handleVisited} className={style.buttons}>
          Places I visited
        </button>
      </div>

      <div className={style.containerAccount}>
        <img src={taskAcc} alt="task" />
        <button className={style.buttons}>Bucket list</button>
      </div>

      <div className={style.containerAccount}>
        <img src={saved} alt="saved" />
        <button onClick={handleSaved} className={style.buttons}>
          Saved
        </button>
      </div>
      <div className={style.containerAccount}>
        <img src={inbox} alt="inbox" />
        <button className={style.buttons}>Inbox</button>
      </div>
    </>
  );
};

export default SectionAccount;
