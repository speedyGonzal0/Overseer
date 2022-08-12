import React from 'react'
import './Login.css'
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';


const Login = () => {

  const [email, setEmail] = useState()
  const [pass, setPass] = useState()

  const submitLogin = (event) => {
    console.log({email})
    console.log({pass})
    event.preventDefault();
  }

  return (
    <main className='loginMain'>
      <h1>Login</h1>
      <form onSubmit={submitLogin} className="loginForm">
        <Input labelPlaceholder="Email" required
              onChange={(e) => {
              setEmail(e.target.value);
            }}/>
        <Input.Password labelPlaceholder="Password" required
            onChange={(e) => {
            setPass(e.target.value);
          }}/>
        <Button type="submit" shadow color="primary">Submit</Button>
      </form>
      <Link block color="primary" href="http://localhost:3000/register">
        Create an account
      </Link>
    </main>
  )
}

export default Login