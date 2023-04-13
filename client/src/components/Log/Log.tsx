import style from "../../styles/Log/Log.module.css";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { loginUser, loginSocialNetworks } from "../../redux/actions/Users";
import swal from "sweetalert";
import { Users } from "../../types";
import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import Cookies from "universal-cookie";

function Log(): JSX.Element {
  const cookies = new Cookies();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email === "" && user.password === "") {
      swal({
        title: "All the fields are required",
        className: `${style.alert}`,
        icon: "warning",
      });
    } else if (user.email === "") {
      swal({
        title: "Email is required",
        className: `${style.alert}`,
        icon: "warning",
      });
    } else if (user.password === "") {
      swal({
        title: "Password is required",
        className: `${style.alert}`,
        icon: "warning",
      });
    } else {
      try {
        dispatch(loginUser(user));
            setTimeout(() => {
          nav("/home");
            }, 1000);
      } catch (error) {
        swal({
          title: `Error: ${error}`,
          className: `${style.alert}`,
          icon: "error",
        });
      }
    }
  };

  // Register Social network

  const [userGoogle, setUserGoogle] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
  });
  const [userFacebook, setUserFacebook] = useState({ username: "" });

  const onResolveGoogle = ({ data, provider }: IResolveParams) => {
    setUserGoogle({
      username: (data && data.name) || (data && data.email.split("@")[0]),
      email: data && data.email,
      firstName: data && data.first_name,
      lastName: data && data.last_name,
      photo: data && data.picture,
    });

    cookies.set("firstName", data?.firstName, { path: "/" });
    cookies.set("lastName", data?.lastName, { path: "/" });
    cookies.set("photo", data?.picture, { path: "/" });
    nav("/home");
  };

  const onResolveFacebook = ({ data }: IResolveParams) => {
    setUserFacebook(data && data.name);
  };

  const onReject = (err: unknown) => {
    throw err;
  };

  useEffect(() => {
    if (userGoogle.username !== "") {
      dispatch(loginSocialNetworks(userGoogle));
    } else if (userFacebook.username !== "") {
      dispatch(loginSocialNetworks(userFacebook));
    }
  }, [userGoogle || userFacebook]);

  return (
    <div className={style.container}>
      <form className={style.content} onSubmit={(e) => handleLogin(e)}>
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
              scope={"https://www.googleapis.com/auth/userinfo.email"}
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
