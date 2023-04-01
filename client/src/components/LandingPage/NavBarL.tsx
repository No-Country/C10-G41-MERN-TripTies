import style from "../../styles/LandingPage/NavBarL.module.css"
import logo from "../../img/Logo.png"
import { Link } from "react-router-dom"

const NavBarL = () => {
    return(
        <>
            <div className={style.containerNavBarL}>
                <div className={style.logoNav}>
                    <img src={logo} alt="logo" />
                </div>

                <div className={style.containerTwo}>
                        <select name="" id="">
                            <option value="">English (United States)</option>
                            <option value="">Spanish</option>
                        </select>
                    <div>
                        <button className={style.singUpBtn}> <Link to="/register">Sing up</Link> </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBarL