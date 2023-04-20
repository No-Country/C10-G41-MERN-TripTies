import saved from "../../img/archiveTick.png";
import inbox from "../../img/sms.png";
import user from "../../img/userAccount.png";
import home from "../../img/home-2.png";
import homeBold from "../../img/homeBold.png";
import style from "../../styles/SectionAccount/Account.module.css";
import { useNavigate } from "react-router-dom";

type props = {
  handleSaved: any;
};

const SectionAccount = ({ handleSaved }: props) => {
  const nav = useNavigate();

  return (
    <>
      <h3 className={style.titleAccount}>Account</h3>
      <div className={style.containerAccount}>
        <img
          src={window.location.pathname === "/home" ? homeBold : home}
          alt="home"
        />
        <button onClick={() => nav("/home")} className={style.buttons}>
          Home
        </button>
      </div>

      <div className={style.containerAccount}>
        <img src={user} alt="user" />
        <button onClick={() => nav("/profile")} className={style.buttons}>
          My Profile
        </button>
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
