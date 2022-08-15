import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login/Login.js';
import Register from './Register/Register';
import DeptOrders from './Employee/DeptOrders/DeptOrders';
import MyOrders from './User/MyOrders/MyOrders';
import Request from './User/Request/Request';
import Home from './User/Home/Home';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderRequests from './Admin/OrderRequests/OrderRequests';
import Orders from './Admin/Orders/Orders';
import Departments from './Admin/Departments/Departments';
import Navbar from './Navbar/Navbar';
import Error from './Error/Error';
import { NextUIProvider } from '@nextui-org/react';

function App() {

  const [loggedIn, setLoggedIn] = useState();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    if(document.cookie){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }    
  }, [loggedIn, admin])
  


  return (
    <NextUIProvider>
      <BrowserRouter>
        <Navbar loggedIn = {loggedIn} setLoggedIn={setLoggedIn} admin = {admin} setAdmin = {setAdmin}/>
          <main className='app'>          
              <Routes>
                {loggedIn? 
                <>
                <Route path="/" element={<Home/>}/>
                <Route path="/deptOrders" element={<DeptOrders/>}/>
                <Route path="/myOrders" element={<MyOrders/>}/>
                <Route path="/myOrders/:id" element={<OrderDetails/>}/>
                <Route path="/request" element={<Request/>}/>
                <Route path="/orderRequests" element={<OrderRequests/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/departments" element={<Departments/>}/>
                <Route path="/login" element={<Login loggedIn = {loggedIn} setLoggedIn={setLoggedIn} setAdmin={setAdmin}/>}/>
                <Route path="/register" element={<Register/>}/>
                </>
                :
                <>
                <Route path="/" element={<Home/>}/>
                <Route path="/deptOrders" element={<Error/>}/>
                <Route path="/myOrders" element={<Error/>}/>
                <Route path="/myOrders/:id" element={<Error/>}/>
                <Route path="/request" element={<Error/>}/>
                <Route path="/orderRequests" element={<Error/>}/>
                <Route path="/orders" element={<Error/>}/>
                <Route path="/departments" element={<Error/>}/>
                <Route path="/login" element={<Login loggedIn = {loggedIn} setLoggedIn={setLoggedIn} setAdmin={setAdmin}/>}/>
                <Route path="/register" element={<Register/>}/>
                </>
                }   
              </Routes>          
          </main>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;