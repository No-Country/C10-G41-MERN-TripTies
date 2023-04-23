import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../redux/actions/Users";
import { useAppDispatch } from "../../redux/store/hooks";
import style from "../../styles/CompleteProfile/CompleteProfile.module.css";
import MiniFooter from "../MiniFooter/MiniFooter";
import Cookies from "universal-cookie";

function CompleteProfile(): JSX.Element {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("login") !== "true") {
      nav("/");
    }
  }, []);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    photoUser:
      "https://res.cloudinary.com/dtpsfvnfo/image/upload/v1682088703/user_avatar_default_udk0e5.jpg",
  });

  const [profile, setProfile] = useState({
    description: "",
    birthday: "",
    portrait:
      "https://res.cloudinary.com/dtpsfvnfo/image/upload/v1682089064/portada_perfil_jmrh5b.png",
  });

  const data = { user, profile };

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(editProfile(data)).then((res) => {
      if (res.status === 200) {
        nav("/home");
      }
    });
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <h1>Complete Profile</h1>
        <section>
          <input
            type="text"
            value={user.first_name}
            onChange={handleChange}
            name="first_name"
            className={style.input}
            placeholder="First name"
          />
          <input
            type="text"
            value={user.last_name}
            onChange={handleChange}
            name="last_name"
            className={style.input}
            placeholder="Last name"
          />
        </section>

        <button
          className={style.button}
          type="submit"
          disabled={user.first_name === "" || user.last_name === ""}
        >
          Continue
        </button>
      </form>
      <MiniFooter />
    </div>
  );
}

export default CompleteProfile;
