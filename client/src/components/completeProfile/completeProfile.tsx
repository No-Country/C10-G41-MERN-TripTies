import { useEffect, useState } from "react";
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
  useEffect(() => {
    if (login === "true") {
      dispatch(getUserById());
      dispatch(getProfileUser());
    } else {
      nav("/");
    }
  }, []);


  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    photo: "",
    profile: {
      description: "",
      birthday: "",
      portrait: "",
    },
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(editProfile(data)).then(() => {
      cookies.set("login", true);
      cookies.set("visit", false);
      cookies.set("fisrtLoading", true);

    }).then(()=> { setTimeout(()=>{nav("/home");},500) })
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <h1>Complete Profile</h1>
        <input
          type="text"
          value={data.first_name}
          onChange={handleChange}
          name="first_name"
          className={style.input}
          placeholder="First name"
        />
        <input
          type="text"
          value={data.last_name}
          onChange={handleChange}
          name="last_name"
          className={style.input}
          placeholder="Last name"
        />
        {/* <label htmlFor="">Description</label>
        <textarea
          value={data.profile.description}
          onChange={handleChange}
          name="description"
        />
        <label htmlFor="">Birthday</label>
        <input
          type="text"
          value={data.profile.description}
          onChange={handleChange}
          name="birthday"
        /> */}

        <button className={style.button} type="submit">
          Continue
        </button>
      </form>
      <MiniFooter />
    </div>
  );
}

export default CompleteProfile;
