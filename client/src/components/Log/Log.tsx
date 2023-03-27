import React from 'react'
import style from '../../styles/Log/Log.module.css';

function Log(): JSX.Element {
  return (
    <>
        <form className={style.container}>
            <h2 className={style.title}>Log In</h2>
            <input className={style.input} placeholder='@ Email address'/>
            <input className={style.input} placeholder='🔒 Password'/>
            <div className={style.underinputs}>
                <div>
                    <input type={'checkbox'}/>
                    <label>Remember Me</label>
                </div>
                <a>Forgot password?</a>
            </div>
            <button className={style.btn}>LOG IN</button>
            <section>
                <p>Or Log In with</p>
                <div className={style.iconContainer}>
                    <i>Google Icon</i>
                    <i>Facebook Icon</i>
                </div>
                <p>Don't have an account?<a> Sign Up</a></p>
            </section>
        </form>
    </>
  )
}

export default Log;