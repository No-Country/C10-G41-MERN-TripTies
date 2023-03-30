import imgFly from "../../img/fly-paper.png";
import imgGuy from "../../img/guy.png";
import style from "../../styles/LandingPage/LandingPage.module.css";
import NavBarL from "./NavBarL";
import MiniFooter from "../MiniFooter/MiniFooter";
import { Link } from "react-router-dom";

const LandingPage = (): JSX.Element => {
  return (
    <>
      <NavBarL />
      <div className={style.containerLanding}>
        <div className={style.flyAndTitle}>
          <h1>TripTies</h1>
          <img src={imgFly} alt="imgFly" />
        </div>

        <div className={style.txtAndBtn}>
          <p>
            Explore the world like never before. Connect with other wanderers
            just like you and discover a new way of traveling.
          </p>
        </div>
        <button className={style.btnExp}>
          {" "}
          <Link to="/home">Explore</Link>
        </button>

        <div className={style.containerGuy}>
          <img className={style.guyImg} src={imgGuy} alt="guy" />
          <div className={style.minFooter}>
            <MiniFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
