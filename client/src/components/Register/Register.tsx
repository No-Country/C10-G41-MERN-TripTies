import style from "../../styles/Register/Register.module.css";
import oculto from "../../img/oculto.png";
import visible from "../../img/visible.png";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import Cross from "../../img/cross.png";
import user from "../../img/user_avatar_default.jpg";
import { useState, useEffect } from "react";
import MiniFooter from "../MiniFooter/MiniFooter";
import {
  createUser,
  loginSocialNetworks,
  loginUser,
} from "../../redux/actions/Users";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { FormState, Users } from "../../types";
import Swal from "sweetalert2";
import {
  IResolveParams,
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import Cookies from "universal-cookie";
import { Privacity } from "../../assets/TermsPrivacity";
import { terms } from "../../assets/TermsPrivacity";

function Register(): JSX.Element {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  //Cookies
  const cookies = new Cookies();

  //State of components
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
    photoUser: "",
  });
  const [userGoogle, setUserGoogle] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photoUser: "",
  });
  const [userFacebook, setUserFacebook] = useState<Users>({
    password: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    photoUser: "",
  });

  //Handles
  function handlePassword(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
    setVisibility(visibility === oculto ? visible : oculto);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (
        newUser.username?.length === 0 ||
        newUser.email?.length === 0 ||
        newUser.password?.length === 0
      ) {
        Swal.fire({ title: "All the fields are required", icon: "warning" });
      } else {
        dispatch(createUser(newUser));
        setInput({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          photoUser: "",
        });
        if (newUser.firstName === "" && newUser.lastName === "") {
          Swal.fire({
            title: "You will be redirected to complete data for your profile",
            icon: "warning",
          })
            .then(() => {
              nav("/completeProfile");
            });
        } else {
          dispatch(loginUser(newUser));
          cookies.set("fisrtLoading", true);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleOnResolveGoogle = ({ data, provider }: IResolveParams) => {
    console.log("datos", data);
    setUserGoogle({
      username: data && data.name,
      email: data && data.email,
      firstName: data && data.given_name,
      lastName: data && data.family_name,
      photoUser: data && data.picture,
      password: `${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  const handleOnResolveFacebook = ({ data }: IResolveParams) => {
    setUserFacebook({
      username: data && data.name,
      email: data && data.email,
      firstName: data && data.first_name,
      lastName: data && data.last_name,
      photoUser: data && data.picture.data.url,
      password: `${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  const handleOnReject = (err: unknown) => {
    throw err;
  };

  //Submit register with social network
  useEffect(() => {
    if (userGoogle.email !== "") {
      console.log("lo q va", userGoogle);
      dispatch(createUser(userGoogle)).then((data: any) => {
        if (data.response?.data !== "User has already exist") {
          dispatch(loginSocialNetworks(userGoogle));
          cookies.set("login", true);
          setTimeout(() => {
            nav("/home");
          }, 1000);
        } else {
          Swal.fire({
            title: "User has already exist, you will be redirected to login",
            icon: "warning",
          }).then(() => nav("/login"));
        }
      });
    }
  }, [userGoogle]);

  return (
    <>
      <div className={style.conteiner}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.Logo}></div>
          <h1>Create Account</h1>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            type="text"
            placeholder="Full Name"
            name="username"
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
                onResolve={handleOnResolveGoogle}
                onReject={handleOnReject}
              >
                <img src={google} alt="Google" style={{ cursor: "pointer" }} />
              </LoginSocialGoogle>
              <LoginSocialFacebook
                appId={import.meta.env.VITE_FB_APP_ID}
                onResolve={handleOnResolveFacebook}
                onReject={handleOnReject}
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
                    <h2>Terms</h2>
                    <button onClick={() => setTermsPrivacity(false)}>
                      <img src={Cross} />
                    </button>
                  </div>
                  <div className={style.text}>
                    {terms.map((e: any) => (
                      <>
                        <p>{e.text}</p>
                      </>
                    ))}
                  </div>
                </aside>
              )) ||
                (info === "Privacity" && (
                  <aside>
                    <div className={style.title}>
                      <h2>Privacity</h2>
                      <button onClick={() => setTermsPrivacity(false)}>
                        <img src={Cross} />
                      </button>
                    </div>
                    <div className={style.text}>
                      {Privacity.map((e: any) => (
                        <>
                          <p>{e.text}</p>
                        </>
                      ))}
                    </div>
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
