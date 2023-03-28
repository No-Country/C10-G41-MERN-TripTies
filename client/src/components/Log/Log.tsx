import React from 'react';
import google from '../../img/google.png';
import facebook from '../../img/facebook.png';
import style from '../../styles/Log/Log.module.css';

function Log(): JSX.Element {
  return (
    
    <div className={style.container}>
        <form className={style.content}>
            <h2 className={style.title}>Log In</h2>
            <input className={style.input} type="email" placeholder='Email address'/>
            <input className={style.input} type="password" placeholder='Password'/>
            <div className={style.underinputs}>
                <div>
                    <input type="checkbox"/>
                    <label>Remember Me</label>
                </div>
                <a>Forgot password?</a>
            </div>
            <button className={style.btn}>LOG IN</button>
            <section>
                <p>Or Log In with</p>
                <div className={style.iconContainer}>
                    <a href='#'>
                        <img src={google} alt="Google"/>
                    </a>
                    <a href='#'>
                        <img src={facebook} alt="Facebook"/>
                    </a>
                </div>
                <p>Don't have an account?<a> Sign Up</a></p>
            </section>
        </form>
    </div>
   
  )
}

export default Log;