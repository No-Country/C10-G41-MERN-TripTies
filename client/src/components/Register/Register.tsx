import style from "../../styles/Register/Register.module.css";
import oculto from "../../img/oculto.png";
import visible from "../../img/visible.png";
import google from "../../img/google.png";
import facebook from "../../img/facebook.png";
import { useState } from "react";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useNavigate } from "react-router-dom";

interface InputProps {
  name: string;
  email: string;
  password: string;
}

function Register(): JSX.Element {
  const [visibility, setVisibility] = useState<string>(oculto);
  const [passwordType, setPasswordType] = useState<string>("password");

  const [input, setInput] = useState<InputProps>({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();

  function handlePassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) : void {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
    setVisibility(visibility === oculto ? visible : oculto);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    if(input.name.length === 0 || input.email.length === 0 || input.password.length === 0){
      alert("Fill in the required fields");
    } else {
      setInput({
        name: "",
        email: "",
        password: "",
      });
  
      window.localStorage.setItem("users", JSON.stringify(input));
      nav("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.conteiner}>
      <form onSubmit={handleSubmit}>
      <div className={style.Logo}>
      </div>
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
