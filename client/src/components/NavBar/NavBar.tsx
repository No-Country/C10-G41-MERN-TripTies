import style from "../../styles/NavBar/NavBar.module.css";
import logo from "../../img/Logo.png";
import user from "../../img/user_avatar_default.jpg";
import bell from "../../img/bell.png";
import drop from "../../img/drop.png";
import arrowDown from "../../img/dropDownArrow.png";
import { useEffect, useRef, useState } from "react";
import DropdownUser from "./DropdownUser";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useAppDispatch } from "../../redux/store/hooks";
import { cleanProfile } from "../../redux/actions/Users";
import Cookies from "universal-cookie";

function NavBar({ handleHome, places, user, visit }: any): JSX.Element {
  const [display, setDisplay] = useState("none");
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    if (user.user?.first_name === "" && user.user?.last_name === "") {
      nav("/completeProfile");
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDisplay("none");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  const handleAppear = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  return (
    <nav className={style.navContainer}>
      <Link to="/home" className={style.navTitle} onClick={handleHome}>
        <img src={logo} alt="" />
        <h1 className={style.navTitleh1}>TripTies</h1>
      </Link>
      {visit === "true" ? (
        <div className={style.navButtons}>
          <button
            onClick={() => cookies.remove("visit")}
            className={style.singUpBtn}
          >
            <Link to="/register">Sing up</Link>{" "}
          </button>
        </div>
      ) : (
        <div className={style.navButtons}>
          <img className={style.navBell} src={bell} alt="bell" />
          <section ref={ref} className={style.dropDownArrow}>
            <h2
              className={style.navButtonsh2}
            >{`${user.user?.first_name} ${user.user?.last_name}`}</h2>
            <img
              onClick={handleAppear}
              src={arrowDown}
              alt="arrowHead"
              className={style.dotMenu}
            />
            <DropdownUser display={display} />
          </section>
          <img
            src={user.user?.photoUser}
            alt=""
            width="50"
            height="50"
            style={{ borderRadius: "50%" }}
          />
        </div>
      )}
    </nav>
  );
}

export default NavBar;
