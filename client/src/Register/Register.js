import React from 'react'
import "./Register.css"
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [regSuccess, setRegSuccess] = useState()

    const regNotify = () => {regSuccess?
        toast.success('Registration successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
        : 
        toast.error('Registration unsuccessful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
    };
  
    const submitReg = (event) => {
      event.preventDefault();
      axios.post("http://localhost:8080/user/register", {
            name: name,
            email: email,
            pass: pass
        }).then((response) => {
            if (response.data.message) {
                setRegSuccess(true)
                // navigate("../login", { replace: true });
                console.log(response.data.message);
            }
            else {
                setRegSuccess(false)
                console.log(response.data);
            }
        });
        event.target.reset();
    }

  return (
    <main className='regMain'>
      <h1>Sign Up</h1>
      <form onSubmit={submitReg} className="regForm">
        <Input labelPlaceholder="Name" required
              onChange={(e) => {
              setName(e.target.value);
            }}/>
        <Input labelPlaceholder="Email" required type="email"
              onChange={(e) => {
              setEmail(e.target.value);
            }}/>
        <Input.Password labelPlaceholder="Password" required
            onChange={(e) => {
            setPass(e.target.value);
          }}/>
        <Button type="submit" shadow color="primary" onClick={regNotify}>Submit</Button>
      </form>
      <Link block color="primary" href="http://localhost:3000/login">
        Already have an account
      </Link>
      <ToastContainer/>
    </main>
  )
}

export default Register