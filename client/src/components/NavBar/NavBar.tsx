import style from "../../styles/NavBar/NavBar.module.css";
import logo from "../../img/Logo.png";
import profile from "../../img/profileImage.png";
import bell from "../../img/bell.png";
import drop from "../../img/drop.png";
import arrowDown from "../../img/dropDownArrow.png";
import { useEffect, useRef, useState } from "react";
import DropdownUser from "./DropdownUser";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

function NavBar({ handleHome, places }: any): JSX.Element {
  const [name, setName] = useState("");
  const [display, setDisplay] = useState("none");
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

  const userData: any = window.localStorage.getItem("users");
  const data = JSON.parse(userData);

  useEffect(() => {
    data && setName(data?.name);
  }, []);

  return (
    <nav className={style.navContainer}>
      <Link to="/home" className={style.navTitle} onClick={handleHome}>
        <img src={logo} alt="" />
        <h1 className={style.navTitleh1}>TripTies</h1>
      </Link>
      <Search places={places} />
      <div className={style.navButtons}>
        <img className={style.navBell} src={bell} alt="bell" />
        <section className={style.dropDownArrow}>
          <h2 className={style.navButtonsh2}>{name ? name : "Traveler"}</h2>
          <img 
            ref={ref}
            onClick={handleAppear} 
            src={arrowDown} 
            alt="arrowHead" 
          />
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
