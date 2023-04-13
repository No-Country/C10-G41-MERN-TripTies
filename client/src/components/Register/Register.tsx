import style from "../../styles/Register/Register.module.css";
import oculto from "../../img/oculto.png";
import visible from "../../img/visible.png";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import Cross from "../../img/cross.png";
import { useState, useEffect } from "react";
import MiniFooter from "../MiniFooter/MiniFooter";
import { createUser } from "../../redux/actions/Users";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { FormState, Users } from "../../types";
import swal from "sweetalert";
import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import TermsPrivacityJSON from "../../assets/TermsPrivacity.json";

function Register(): JSX.Element {
  const [visibility, setVisibility] = useState<FormState["visibility"]>(oculto);
  const [passwordType, setPasswordType] =
    useState<FormState["passwordType"]>("password");

  const [TermsPrivacity, setTermsPrivacity] = useState(false);
  const [info, setInfo] = useState("");

  const [newUser, setInput] = useState<FormState["newUser"]>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photo: "",
  });

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  /* Maneja la visibilidad de la contraseña cuando se hace click en el botón */
  function handlePassword(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
    setVisibility(visibility === oculto ? visible : oculto);
  }

  /* Maneja el evento de envío del formulario */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    try {
      if (
        newUser.username.length === 0 ||
        newUser.email.length === 0 ||
        newUser.password.length === 0
      ) {
        swal({
          title: "All the fields are required",
          className: `${style.alert}`,
          icon: "warning",
        });
      } else {
        dispatch(createUser(newUser));
        setInput({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          photo: "",
        });

        // nav("/login");
      }
    } catch (error) {
      throw error;
    }
  };

  /* Setea el estado local con los datos del fomulario */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.name === "name"
      ? setInput({
          ...newUser,
          username: e.target.value,
        })
      : setInput({
          ...newUser,
          [e.target.name]: e.target.value,
        });
  };

  // Register Social network

  const [userGoogle, setUserGoogle] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
  });

  const [userFacebook, setUserFacebook] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
  });
  const onResolveGoogle = ({ data, provider }: IResolveParams) => {
    setUserGoogle({
      username: (data && data.name) || (data && data.email.split("@")[0]),
      email: data && data.email,
      firstName: data && data.first_name,
      lastName: data && data.last_name,
      photo: data && data.picture,
      password: `${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  const onResolveFacebook = ({ data }: IResolveParams) => {
    setUserFacebook({
      username: data && data.name,
      email: data && data.email,
      firstName: data && data.first_name,
      lastName: data && data.last_name,
      photo: data && data.picture.data.url,
      password: `${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  const onReject = (err: unknown) => {
    throw err;
  };

  useEffect(() => {
    if (userGoogle.email !== "") {
      dispatch(createUser(userGoogle));
    } else if (userFacebook.email !== "") {
      dispatch(createUser(userFacebook));
    }
  }, [userGoogle || userFacebook]);

  return (
    <>
      <div className={style.conteiner}>
        <form onSubmit={handleSubmit}>
          <div className={style.Logo}></div>
          <h1>Create Account</h1>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            type="text"
            placeholder="Full Name"
            name="name"
            id="name"
            value={newUser.username}
          />
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            type="email"
            placeholder="Email address"
            name="email"
            id="email"
            value={newUser.email}
          />
          <div className={style.password}>
            <input
              onChange={(e) => handleChange(e)}
              className={style.input}
              type={passwordType}
              placeholder="Password"
              name="password"
              id="password"
              value={newUser.password}
            />
            <button onClick={(e) => handlePassword(e)}>
              <img src={visibility} alt="password visibility" />
            </button>
          </div>
          <div className={style.checkbox}>
            <div className={style.content}>
              <input type="checkbox" id="checkbox" />
              <span>
                I agree with{" "}
                <a
                  onClick={() => {
                    setTermsPrivacity(true);
                    setInfo("Terms");
                  }}
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  onClick={() => {
                    setTermsPrivacity(true);
                    setInfo("Privacity");
                  }}
                >
                  Privacy
                </a>
              </span>
            </div>
          </div>
          <button className={style.btn} type="submit">
            SIGN UP
          </button>
          <section>
            <p>Or Sign Up with</p>
            <div className={style.redes}>
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
              Already have an account? <a href="/login">Log In</a>
            </p>
          </section>
        </form>
        <MiniFooter />
      </div>
      <div className={style.modalContainer}>
        {TermsPrivacity ? (
          <div className={style.modal}>
            <section className={style.container}>
              {(info === "Terms" && (
                <aside>
                  <div className={style.title}>
                    <h2>{TermsPrivacityJSON[0].type}</h2>
                    <button onClick={() => setTermsPrivacity(false)}>
                      <img src={Cross} />
                    </button>
                  </div>
                  <p className={style.text}>{TermsPrivacityJSON[0].text}</p>
                </aside>
              )) ||
                (info === "Privacity" && (
                  <aside>
                    <div className={style.title}>
                      <h2>{TermsPrivacityJSON[1].type}</h2>
                      <button onClick={() => setTermsPrivacity(false)}>
                        <img src={Cross} />
                      </button>
                    </div>
                    <p className={style.text}>{TermsPrivacityJSON[1].text}</p>
                  </aside>
                ))}
            </section>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Register;
