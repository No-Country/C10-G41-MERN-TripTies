import React from 'react'
import style from '../../styles/Log/Log.module.css';

function Log(): JSX.Element {
  return (
    <>
        <div />
        <form>
            <h2>Log In</h2>
            <input placeholder='Email address'/>
            <input placeholder='Password'/>
            <div>
                <input type={'checkbox'}/>
                <a>Forgot password?</a>
            </div>
            <button>Log In</button>
            <section>
                <p>Or Log In with</p>
                <div>
                    <i></i>
                    <i></i>
                </div>
                <p>Don't have an account?<a>Sign Up</a></p>
            </section>
        </form>
    </>
  )
}

export default Log;