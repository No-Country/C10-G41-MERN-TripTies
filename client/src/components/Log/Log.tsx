import google from '../../img/google.png';
import facebook from '../../img/facebook.png';
import style from '../../styles/Log/Log.module.css';
import MiniFooter from '../MiniFooter/MiniFooter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Log(): JSX.Element {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();


    const userData: any = window.localStorage.getItem("users")
    const data = JSON.parse(userData)
    const handleLogin = (e : any) => {
        e.preventDefault()
        if (data === null || data.email !== email && data.password !== password ) {
            alert("The email or the password are incorrect");
        } else if (data.email === email && data.password === password) {
            nav("/home")
        }
    }

    return (
        <div className={style.container}>
            <form className={style.content} onSubmit={(e) => handleLogin(e)}>
                <div className={style.Logo}>
                </div>
                <h2 className={style.title}>Log In</h2>
                <input className={style.input} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email address' name='email' id='email' />
                <input className={style.input} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' name='password' id='password' />
                <div className={style.underinputs}>
                    <div className={style.checkbox}>
                        <input type="checkbox" id='checkbox' />
                        <label>Remember Me</label>
                    </div>
                    <a>Forgot password?</a>
                </div>
                <button type="submit" className={style.btn}>LOG IN</button>
                <section>
                    <p>Or Log In with</p>
                    <div className={style.iconContainer}>
                        <a href='#'>
                            <img src={google} alt="Google" />
                        </a>
                        <a href='#'>
                            <img src={facebook} alt="Facebook" />
                        </a>
                    </div>
                    <p>Don't have an account?<a href='/register'> Sign Up</a></p>
                </section>
            </form>
            <MiniFooter />
        </div>

    )
}

export default Log;