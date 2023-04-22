import style from "../../styles/Log/Log.module.css";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  loginUser,
  loginSocialNetworks,
  getProfileUser,
} from "../../redux/actions/Users";
import { Profile, Users } from "../../types";
import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function Log(): JSX.Element {
  const cookies = new Cookies();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const profile: Profile = selector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfileUser(undefined));
  }, []);

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email === "" && user.password === "") {
      Swal.fire({ title: "All the fields are required", icon: "warning" });
    } else if (user.email === "") {
      Swal.fire({ title: "Email is required", icon: "warning" });
    } else if (user.password === "") {
      Swal.fire({ title: "Password is required", icon: "warning" });
    } else {
      try {
        await dispatch(loginUser(user));
        cookies.set("login", true);
        cookies.set("visit", false);
        cookies.set("fisrtLoading", true);
        nav("/home");
      } catch (error) {
        Swal.fire({ title: `Error ${error}`, icon: "error" });
      }
    }
  };

  // Register Social network

  const [userGoogle, setUserGoogle] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photoUser: "",
  });
  const [userFacebook, setUserFacebook] = useState({ username: "" });

  const onResolveGoogle = ({ data, provider }: IResolveParams) => {
    setUser({
      username: data && data.name,
      email: "",
      password: "",
    });
  };

  // No funciona el login con facebook

  const onResolveFacebook = ({ data }: IResolveParams) => {
    setUserFacebook(data && data.name);
  };

  const onReject = (err: unknown) => {
    throw err;
  };

  useEffect(() => {
    if (user.username !== "") {
      dispatch(loginSocialNetworks(user)).then(() => {
        cookies.set("login", true);
        cookies.set("visit", false);
        cookies.set("fisrtLoading", true);
        nav("/home");
      });
    } else if (userFacebook.username !== "") {
      dispatch(loginSocialNetworks(userFacebook));
    }
  }, [user]);

  return (
    <div className={style.container}>
      <form className={style.content} onSubmit={handleLogin}>
        <div className={style.Logo}></div>
        <h2 className={style.title}>Log In</h2>
        <input
          className={style.input}
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          name="email"
          id="email"
          value={user.email}
        />
        <input
          className={style.input}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={user.password}
        />
        <div className={style.underinputs}>
          <div className={style.checkbox}>
            <input type="checkbox" id="checkbox" />
            <label>Remember Me</label>
          </div>
          <a>Forgot password?</a>
        </div>
        <button type="submit" className={style.btn}>
          LOG IN
        </button>
        <section>
          <p>Or Log In with</p>
          <div className={style.iconContainer}>
            <LoginSocialGoogle
              client_id={import.meta.env.VITE_GG_APP_ID}
              onResolve={onResolveGoogle}
              onReject={onReject}
            >
              <img src={google} alt="Google" style={{ cursor: "pointer" }} />
            </LoginSocialGoogle>
            <LoginSocialFacebook
              appId={import.meta.env.VITE_FB_APP_ID}
              onResolve={onResolveFacebook}
              onReject={onReject}
              fieldsProfile={
                "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
              }
            >
              <img
                src={facebook}
                alt="Facebook"
                style={{ cursor: "pointer" }}
              />
            </LoginSocialFacebook>
          </div>
          <p>
            Don't have an account?<a href="/register"> Sign Up</a>
          </p>
        </section>
      </form>
      <MiniFooter />
    </div>
  );
}

export default Log;
