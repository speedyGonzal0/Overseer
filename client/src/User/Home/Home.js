import React from 'react'
import "./Home.css"
import { Button } from '@nextui-org/react';
import { Link, useNavigate } from "react-router-dom";


function Home() {

    let navigate = useNavigate();
  return (
    <div className='homeContainer'>
        <h1>Welcome to Overseer</h1>
        <h3>The ultimate order management system</h3>
        <Button shadow size="xl" onClick={() => navigate("/request")}> See Demo </Button>
    </div>
  )
}

export default Home