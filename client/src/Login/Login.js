import React from 'react'
import './Login.css'
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Login = ({loggedIn, setLoggedIn}) => {

  let navigate = useNavigate();

  const [email, setEmail] = useState()
  const [pass, setPass] = useState()

  const submitLogin = (event) => {
    event.preventDefault();
      axios.post("http://localhost:8080/user/signin", {
            email: email,
            password: pass
        }, { withCredentials: true }).then((response) => {
            if (response.data.message) {
                navigate("/request", { replace: true });
                setLoggedIn(true);
                console.log(response.data.message);
                console.log(document.cookie)
            }
            else {
                console.log(response.data);
            }
        });
        event.target.reset();
  }

  return (
    <main className='loginMain'>
      <h1>Login</h1>
      <form onSubmit={submitLogin} className="loginForm">
        <Input  labelPlaceholder="Email" required
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