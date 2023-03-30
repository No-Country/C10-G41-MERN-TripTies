import style from "../../styles/NavBar/NavBar.module.css";
import logo from "../../img/Logo.png";
import profile from "../../img/profileImage.png";
import bell from "../../img/bell.png";
import drop from "../../img/drop.png";
import arrowDown from "../../img/dropDownArrow.png";
import { useEffect, useState } from "react";
import DropdownUser from "./DropdownUser";

function NavBar(): JSX.Element {
  const [name, setName] = useState("");
  const [display, setDisplay] = useState("none");

  const handleAppear = () => {
    if(display === "none"){
      setDisplay("block")
    } else {
      setDisplay("none")
    }
  }

  const userData: any = window.localStorage.getItem("users");
  const data = JSON.parse(userData);

  useEffect(() => {
    setName(data.name);
  }, []);

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
        <section className={style.dropDownArrow}>
          <h2 className={style.navButtonsh2}>{name}</h2>
          <img onClick={handleAppear} src={arrowDown} alt="arrowHead"/>
          <DropdownUser display={display} />
        </section>
        <img src={profile} alt="" width="24" height="24" />
        <div className={style.navSelectContainer}>
          <select
            defaultValue={"en"}
            name=""
            id=""
            className={style.navSelectBox}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
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
