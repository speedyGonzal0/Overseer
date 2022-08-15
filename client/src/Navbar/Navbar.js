import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react';
import axios from "axios"
import { useEffect } from 'react';


const Navbar = ( {loggedIn, setLoggedIn, admin, setAdmin} ) => {

  let navigate = useNavigate(); 
  

  const submitLogout = (event) => {
    event.preventDefault();
    axios.get("http://localhost:8080/user/signout", {withCredentials : true}).then((response) => {
      setLoggedIn(false);
      if(admin){
        setAdmin(false);
      }
      navigate("/login");
      console.log(response.data);      
    });  
  }

  return (
    <nav className = "navbarContainer">
      <div className="navbarLogo">
        <h2>Overseer</h2>
      </div>
      {!admin ? 
        <div className="navbarLinks">
          <Link to="/"> <b>Home</b> </Link>
          <Link to="/request"> <b>Place Order</b> </Link>
          <Link to="/myOrders"> <b>My Orders</b> </Link>
        </div>  
        :
        <div className="adminNavbarLinks">
            <Link to="/orderRequests"><b>Pending</b></Link>
            <Link to="/orders"><b>Active</b></Link>
            <Link to="/departments"><b>Assign</b></Link>
        </div>
    }
      
      { !loggedIn ? 
          <div className="navbarLogin">
            <Button onClick={()=> navigate("/register")}>Register</Button>
            <Button bordered onClick={() => navigate("/login")}>Log In</Button>
            {/* <Button onClick={() => setLoggedIn(true)}>temp</Button> */}
          </div>
          :
          <div className="navbarLoggedIn">
            <Button onClick={submitLogout}>Log out</Button>
          </div>

      }
      
    </nav>
    
  )
}

export default Navbar