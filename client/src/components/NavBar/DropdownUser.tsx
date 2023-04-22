import style from "../../styles/NavBar/DropdownUser.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { cleanProfile } from "../../redux/actions/Users";
import Cookies from "universal-cookie";

function DropdownUser({ display }: string | any) {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

  const id = cookies.get("idUser");

  const handleLogOut = () => {
    dispatch(cleanProfile());
    cookies.remove("login");
    cookies.remove("idUser");
    cookies.remove("token");
    cookies.set("visit", false);
    window.localStorage.removeItem("UserChat");
    nav("/");
  };

  return (
    <div className={style.container} style={{ display: display }}>
      <ul>
        <li className={style.dropdownElement}>
          <Link className={style.Link} to={`/profile/${id}`}>
            View profile
          </Link>
        </li>
        <li onClick={handleLogOut} className={style.dropdownElement}>
          <p className={style.text} style={{ color: "var(--brown)" }}>
            Log out
          </p>
        </li>
      </ul>
    </div>
  );
}

export default DropdownUser;
