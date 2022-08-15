import React from 'react'
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./Error.css"

const Error = () => {

    let navigate = useNavigate();

  return (
    <main className='errorContainer'>
        <h1>ERROR: 401</h1>
        <h3>Authorization Required</h3>
        <Button onClick={ () => navigate("/login")}>Log In</Button>
    </main>
  )
}

export default Error