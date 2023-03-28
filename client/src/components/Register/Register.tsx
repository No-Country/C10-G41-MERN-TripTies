import style from '../../styles/Register/Register.module.css'
import oculto from '../../img/oculto.png'
import visible from '../../img/visible.png'
import google from '../../img/google.png'
import facebook from '../../img/facebook.png'
import { useState } from 'react'
import MiniFooter from '../MiniFooter/MiniFooter'
import paperBG from '../../img/paperPlanes.png'

function Register(): JSX.Element {
    const [visibility, setVisibility] = useState(oculto)
    const [passwordType, setPasswordType] = useState("password");

    function handlePassword(e:any){
        e.preventDefault()
        setPasswordType(passwordType === "password" ? "text" : "password");
        setVisibility(visibility === oculto ? visible : oculto)
    }

    return (
        <div className={style.conteiner}>
            <img className={style.bg} src={paperBG} alt="paperPlanes"/>
            <form>
                <h1>Create Account</h1>
                <input className={style.input} type="text" placeholder='Full Name' name="name"/>
                <input className={style.input} type="email" placeholder='Email address' name="email" />
                <div className={style.password}>
                  <input className={style.input} type={passwordType} placeholder='Password' name="password" id="password"/>
                  <button onClick={e => handlePassword(e)}>
                    <img src={visibility} alt="password visibility" />
                  </button>
                </div>
                <div className={style.checkbox}>
                    <input type="checkbox" />
                    <span>
                        I agree with <a href='#'>Terms</a> and <a href='#'>Privacy</a>
                    </span>
                </div>
                <button className={style.btn} type='submit' >SIGN UP</button>
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
                    <p>Already have an account? <a href='/login'>Log In</a></p>
                </section>
            </form>
            <MiniFooter/>
        </div>
    )
}

export default Register