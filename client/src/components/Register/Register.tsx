import React from "react";
import style from "../../styles/Register/Register.module.css";
import oculto from "../../img/oculto.png";
import visible from "../../img/visible.png";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import { useState } from "react";
import MiniFooter from "../MiniFooter/MiniFooter";
import { createUser } from "../../redux/actions/Users";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { FormState } from "../../types";
import SocialNetworks from "../Social networks/SocialNetworks";
import swal from "sweetalert";

function Register(): JSX.Element {
  const [visibility, setVisibility] = useState<FormState["visibility"]>(oculto);
  const [passwordType, setPasswordType] =
    useState<FormState["passwordType"]>("password");

  const [newUser, setInput] = useState<FormState["newUser"]>({
    username: "",
    email: "",
    password: "",
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
        });

        nav("/login");
      }
    } catch (error) {
      console.log(error);
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

  return (
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
              I agree with <a href="#">Terms</a> and <a href="#">Privacy</a>
            </span>
          </div>
        </div>
        <button className={style.btn} type="submit">
          SIGN UP
        </button>
        <section>
          <p>Or Sign Up with</p>
          <div className={style.redes}>
            <SocialNetworks />
          </div>
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </section>
      </form>
      <MiniFooter />
    </div>
  );
}

export default Register;
