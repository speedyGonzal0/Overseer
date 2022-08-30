import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react';
import axios from "axios"
import { useEffect } from 'react';


const Navbar = ( {loggedIn, setLoggedIn, employee, setEmployee} ) => {

  let navigate = useNavigate(); 
  

  const submitLogout = (event) => {
    event.preventDefault();
    axios.get("http://localhost:8080/user/signout", {withCredentials : true}).then((response) => {
      setLoggedIn(false);
      // if(admin){
      //   setAdmin(false);
      //   setEmployee(false);
      // }
      window.localStorage.clear();
      navigate("/login");
      console.log(response.data);      
    });  
  }

  return (
    <nav className = "navbarContainer">
      <div className="navbarLogo">
        <h2>Overseer</h2>
      </div>
      {window.localStorage.getItem("isAdmin") === "false" || !window.localStorage.getItem("isAdmin")  ? 
        <div className="navbarLinks">
          <Link to="/"> <b>Home</b> </Link>
          <Link to="/request"> <b>Place Order</b> </Link>
          <Link to="/myOrders"> <b>My Orders</b> </Link>
          <Link to="/mail"> <b>Contact Us</b> </Link>
        </div>  
        :
        <div className="adminNavbarLinks">
            <Link to="/orderRequests"><b>Pending orders</b></Link>
            <Link to="/orders"><b>Active orders</b></Link>
            <Link to="/departments"><b>Department tasks</b></Link>
            <Link to="/createDept"><b>Create department</b></Link>
        </div>
    }
      
      { !document.cookie ? 
          <div className="navbarLogin">
            <Button onClick={() => navigate("/login")}>Log In</Button>
            <Button bordered onClick={()=> navigate("/register")}>Register</Button>
            
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