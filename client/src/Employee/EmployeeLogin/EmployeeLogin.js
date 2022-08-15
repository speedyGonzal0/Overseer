import React from 'react'
import './EmployeeLogin.css'
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";


const EmployeeLogin = ({setLoggedIn, setAdmin, setEmployee}) => {

  let navigate = useNavigate();

  const [email, setEmail] = useState()
  const [pass, setPass] = useState()

  const submitLogin = (event) => {
    event.preventDefault();
      axios.post("http://overseerserver-env.eba-y32sh6qs.ap-south-1.elasticbeanstalk.com/employee/signin", {
            email: email,
            password: pass
        }, { withCredentials: true }).then((response) => {
            if (response.data) {
              if(response.data.role === "Employee"){
                setAdmin(false)
                setLoggedIn(true)
                setEmployee(true)
                navigate("/deptOrders", { replace: true });
              }
            //   setLoggedIn(true);
                
                // if(response.data.role == "Admin") { setAdmin(true) }
                // console.log(response.data.role);
                // console.log(document.cookie)
            }
            else {
                console.log(response.data);
            }
        });
        event.target.reset();
  }

  return (
    <main className='loginMain'>
      <h1>Employee Login</h1>
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
    </main>
  )
}

export default EmployeeLogin