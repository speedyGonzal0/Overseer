import React from 'react'
import './Login.css'
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({loggedIn, setLoggedIn, setAdmin}) => {

  let navigate = useNavigate();

  const [email, setEmail] = useState()
  const [pass, setPass] = useState()

  const loginNotify = () => {
     toast.error('Login unsuccessful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
    }

  const submitLogin = (event) => {
    event.preventDefault();
      axios.post("http://localhost:8080/user/signin", {
            email: email,
            password: pass
        }, { withCredentials: true }).then((response) => {
            if (response.data.role) {
              if(response.data.role === "Client"){
                setAdmin(false)
                navigate("/request", { replace: true });
              }
              else if(response.data.role === "Admin"){
                setAdmin(true)
                navigate("/orderRequests")
              }
              setLoggedIn(true);
                
                console.log(response.data.role);
                console.log(document.cookie)
            }
            else {
                loginNotify()
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
        <Button type="submit" shadow color="primary" onClick={loginNotify}>Submit</Button>
      </form>
      <Link block color="primary" href="http://localhost:3000/register">
        Create an account
      </Link>
      <ToastContainer/>
    </main>
  )
}

export default Login