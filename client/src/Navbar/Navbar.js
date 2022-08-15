import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react';
import axios from "axios"


const Navbar = ( {loggedIn, setLoggedIn, admin, setAdmin, employee, setEmployee} ) => {

  let navigate = useNavigate();
  

  const submitLogout = (event) => {
    event.preventDefault();
    axios.get("http://localhost:8080/user/signout", {withCredentials : true}).then((response) => {
      setLoggedIn(false);
      if(admin){
        setAdmin(false);
        setEmployee(false);
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
            <Link to="/orderRequests"><b>Pending orders</b></Link>
            <Link to="/orders"><b>Active orders</b></Link>
            <Link to="/departments"><b>Department tasks</b></Link>
            <Link to="/createDept"><b>Create department</b></Link>
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
            <p>User name</p>
            <Button onClick={submitLogout}>Log out</Button>
          </div>

      }
      
    </nav>
    
  )
}

export default Navbar