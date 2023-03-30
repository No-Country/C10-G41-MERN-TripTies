import style from "../../styles/Register/Register.module.css";
import oculto from "../../img/oculto.png";
import visible from "../../img/visible.png";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import { useState } from "react";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {
  const [visibility, setVisibility] = useState(oculto);
  const [passwordType, setPasswordType] = useState("password");

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();

  function handlePassword(e: any) {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
    setVisibility(visibility === oculto ? visible : oculto);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInput({
      name: "",
      email: "",
      password: "",
    });

    //   const data = window.localStorage.setItem("userData", JSON.stringify(input));
    window.localStorage.setItem("users", JSON.stringify(input));
    nav("/login");
  };

  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.conteiner}>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <input
          onChange={(e) => handleChange(e)}
          className={style.input}
          type="text"
          placeholder="Full Name"
          name="name"
          id="name"
          value={input.name}
        />
        <input
          onChange={(e) => handleChange(e)}
          className={style.input}
          type="email"
          placeholder="Email address"
          name="email"
          id="email"
          value={input.email}
        />
        <div className={style.password}>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            type={passwordType}
            placeholder="Password"
            name="password"
            id="password"
            value={input.password}
          />
          <button onClick={(e) => handlePassword(e)}>
            <img src={visibility} alt="password visibility" />
          </button>
        </div>
        <div className={style.checkbox}>
          <input type="checkbox" id="checkbox" />
          <span>
            I agree with <a href="#">Terms</a> and <a href="#">Privacy</a>
          </span>
        </div>
        <button className={style.btn} type="submit">
          SIGN UP
        </button>
        <section>
          <p>Or Sign Up with</p>
          <div className={style.redes}>
            <a href="#">
              <img src={google} alt="google" />
            </a>
            <a href="#">
              <img src={facebook} alt="facebook" />
            </a>
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
