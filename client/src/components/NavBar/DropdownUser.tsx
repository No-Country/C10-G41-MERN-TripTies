import style from "../../styles/NavBar/DropdownUser.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { cleanProfile } from "../../redux/actions/Users";
import Cookies from "universal-cookie";

function DropdownUser({ display }: string | any) {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

  const handleLogOut = () => {
    dispatch(cleanProfile());
    cookies.remove("login");
    cookies.set("visit", false);
    nav("/");
  };

  return (
    <div className={style.container} style={{ display: display }}>
      <ul>
        <li className={style.dropdownElement}>
          <p>View profile</p>
        </li>
        <li className={style.dropdownElement}>
          <p>Account settings</p>
        </li>
        <li onClick={handleLogOut} className={style.dropdownElement}>
          <p style={{ color: "var(--brown)" }}>Log out</p>
        </li>
      </ul>
    </div>
  );
}

export default DropdownUser;
