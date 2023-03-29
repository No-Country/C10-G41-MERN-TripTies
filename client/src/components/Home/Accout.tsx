import locationH from "../../img/locationH.png";
import taskAcc from "../../img/taskAcc.png";
import saved from "../../img/saved.png";
import inbox from "../../img/inbox.png";
import style from "../../styles/Home/Account.module.css";

const Account = () => {
    return(
        <>
          <h3 className={style.titleAccount}>Account</h3>
          <div className={style.containerAccount}>
            <img src={locationH} alt="location" />
            <p>Places I visited</p>  
          </div>

          <div className={style.containerAccount}>
            <img src={taskAcc} alt="task" />
            <p>Bucket list</p>
          </div>

          <div className={style.containerAccount}>
            <img src={saved} alt="saved" />
            <p>Saved</p>
          </div>
          <div className={style.containerAccount}>
            <img src={inbox} alt="inbox" />
            <p>Inbox</p>
          </div> 
        </>
    )
}

export default Account