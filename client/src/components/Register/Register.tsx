import React from 'react'

function Register(): JSX.Element {
  return (
    <div>
        <form>
            <h2>Create Acconut</h2>
            <input type="text" placeholder='Full Name' name="fullname"/>
            <input type="email" placeholder='Email address' name="email"/>
            <input type="password" placeholder='Password' name="password"/>
            <div>
            <input type="checkbox"/>
            I agree with <a>Terms</a> and <a>Privacy</a>
            </div>
        </form>
    </div>
  )
}

export default Register