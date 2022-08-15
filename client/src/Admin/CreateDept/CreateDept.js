import React from 'react'
import "./CreateDept.css"
import { Input, Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateDept() {

    let navigate = useNavigate();

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()

    const submitDept = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/employee/register", {
            employeeName: name,
            employeeEmail: email,
            employeePass: pass
          }).then((response) => {
              if (response.data.message) {
                  navigate("/departments", { replace: true });
                  console.log(response.data.message);
              }
              else {
                  console.log(response.data);
              }
          });
          event.target.reset();
      }

  return (


    <main className='createDeptContainer'>
        <h1>Create Department</h1>
        <form onSubmit={submitDept} className="deptForm">
        <Input labelPlaceholder="Department Name" required
              onChange={(e) => {
              setName(e.target.value);
            }}/>
        <Input labelPlaceholder="Employee Email" required 
              onChange={(e) => {
              setEmail(e.target.value);
            }}/>
        <Input.Password labelPlaceholder="Employee Password" required
            onChange={(e) => {
            setPass(e.target.value);
          }}/>
        <Button type="submit" shadow color="primary">Submit</Button>
      </form>
    </main>
  )
}

export default CreateDept