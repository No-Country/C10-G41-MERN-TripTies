import React from "react";
import styles from "../../styles/Footer/FooterTerms.module.css";
import Elipse from "../../img/Ellipse 8.png";
const FooterTerm: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <a href="#" className={styles.legal}>
              Privacy Policy
            </a>
        
            <img src={Elipse} alt="img not found" className={styles.elipse} />
            <a href="#" className={styles.legal}>
              Terms of Use
            </a>
            <img src={Elipse} alt="img not found" className={styles.elipse} />
            <a href="#" className={styles.legal}>
              Legal
            </a>
          </div>
          <div className={styles.col}>
            <p className={styles.reserved}>© 2023 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTerm;
