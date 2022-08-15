import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react';

const Navbar = ( { loggedIn, setLoggedIn }) => {

  let navigate = useNavigate();
  
  return (
    <nav className = "navbarContainer">
      <div className="navbarLogo">
        <h2>Overseer</h2>
      </div>
      <div className="navbarLinks">
        <Link to="/"> <b>Home</b> </Link>
        <Link to="/request"> <b>Place Order</b> </Link>
        <Link to="/myOrders"> <b>My Orders</b> </Link>
      </div>
      { !loggedIn ? 
          <div className="navbarLogin">
            <Button onClick={()=> navigate("/register")}>Register</Button>
            <Button bordered onClick={() => navigate("/login")}>Log In</Button>
            <Button onClick={() => setLoggedIn(true)}>temp</Button>
          </div>
          :
          <div className="navbarLoggedIn">
            <p>User name</p>
            <Button onClick={() => setLoggedIn(false)}>Log out</Button>
          </div>

      }
      
    </nav>
    
  )
}

export default Navbar