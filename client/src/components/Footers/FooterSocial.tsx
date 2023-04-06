import React from "react";
import style from "../../styles/Footer/FoteerSocial.module.css"
import Facebook from "../../img/Facebookfoter.png";
import Instagram from "../../img/instagram.png";
import Linkedin from "../../img/linkedin.png";
import Twitter from "../../img/Twitter.png";
import Logo from "../../img/Logofotter.png";
import Elipse from "../../img/Ellipse 8.png";
const FooterSocial: React.FC = () => {
  return (
    <footer className={style.footerContainer}>
      <div>
        <nav className={style.navegacion}>
          <ul className={style.listaDes}>
            <li className={style.listaOrd}>
              <img className={style.logoimg} src={Logo} alt="img not found" />
              <a className={style.foterletras} href="/about-us">
                About Us
              </a>
            </li>
            <li className={style.listaOrd}>
              <img src={Elipse} alt="img not found" />
            </li>
            <li className={style.listaOrd}>
              <a className={style.foterletras} href="/faqs">
                FAQs
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.socialIcons}>
        <a href="https://www.facebook.com/">
          <img
            className={style.socialIcon}
            src={Facebook}
            alt="img not found"
          />
        </a>
        <a href="https://twitter.com/">
          <img className={style.socialIcon} src={Twitter} alt="img not found" />
        </a>
        <a href="https://www.instagram.com/">
          <img
            className={style.socialIcon}
            src={Instagram}
            alt="img not found"
          />
        </a>

        <a href="https://www.linkedin.com/">
          <img
            className={style.socialIcon}
            src={Linkedin}
            alt="img not found"
          />
        </a>
      </div>
    </footer>
  );
};


export default FooterSocial;
