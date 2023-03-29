import style from "../../styles/NavBar/NavBar.module.css";
import logo from "../../img/Logo.png";
import profile from "../../img/profileImage.png";
import bell from "../../img/bell.png";
import drop from "../../img/drop.png";
function NavBar(): JSX.Element {
  return (
    <nav className={style.navContainer}>
      <div className={style.navTitle}>
        <img src={logo} alt="" />
        <h1 className={style.navTitleh1}>TripTies</h1>
      </div>
      <div className={style.navSearch}>
        <input
          type="text"
          className={style.navInput}
          placeholder="Where are you going?"
        />
      </div>
      <div className={style.navButtons}>
        <img src={bell} alt="" />
        <h2 className={style.navButtonsh2}>Emma</h2>
        <img src={profile} alt="" width="24" height="24" />
        <div className={style.navSelectContainer}>
          <select name="" id="" className={style.navSelectBox}>
            <option selected>EN</option>
            <option>ES</option>
          </select>
          <div className={style.navIcon}>
            <img src={drop} alt="" width="20" height="20" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
