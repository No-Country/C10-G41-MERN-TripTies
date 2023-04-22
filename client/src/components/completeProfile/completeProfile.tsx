import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  getProfileUser,
  getUserById,
  editProfile,
  loginUser,
} from "../../redux/actions/Users";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Profile, UserLogin } from "../../types";
import style from "../../styles/CompleteProfile/CompleteProfile.module.css";
import MiniFooter from "../MiniFooter/MiniFooter";

function CompleteProfile(): JSX.Element {
  const nav = useNavigate();
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const profileUser: Profile = selector((state) => state.profile);
  const userData: UserLogin = selector((state) => state.user);
  const login = cookies.get("login");
  const id = cookies.get("idUser");
  useEffect(() => {
    if (login === "true") {
      dispatch(getUserById());
      dispatch(getProfileUser(id));
    } else {
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

  const handlePortrait = (files: FileList | null) => {
    if (files) {
      const image = files[0] || "";
      setUser({
        ...user,
        photoUser: image.name,
      });
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(editProfile(data))
      .then(() => {
        dispatch(loginUser({email: userData.user?.email, password: userData.user?.password}))
        cookies.set("login", true);
        cookies.set("visit", false);
        cookies.set("fisrtLoading", true);
      })
      .then(() => {
          nav("/home");
        });
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <h1>Complete Profile</h1>
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
        <input type="file" onChange={(e) => handlePortrait(e.target.files)} />
        <textarea
          value={profile.description}
          onChange={handleChange}
          name="description"
          className={style.input}
          placeholder="Description"
        />
        <input
          type="text"
          value={profile.birthday}
          onChange={handleChange}
          name="birthday"
          className={style.input}
          placeholder="Birthday"
        />

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
