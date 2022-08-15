import React from 'react'
import "./Register.css"
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

  let navigate = useNavigate();

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
  
    const submitReg = (event) => {
      event.preventDefault();
      axios.post("http://localhost:8080/user/register", {
            name: name,
            email: email,
            pass: pass
        }).then((response) => {
            if (response.data.message) {
                navigate("../login", { replace: true });
                console.log(response.data.message);
            }
            else {
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
      <Link block color="primary" href="http://localhost:3000/login">
        Already have an account
      </Link>
    </main>
  )
}

export default Register