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
import CreateDept from './Admin/CreateDept/CreateDept';
import EmployeeLogin from './Employee/EmployeeLogin/EmployeeLogin';

function App() {

  const [loggedIn, setLoggedIn] = useState();
  const [admin, setAdmin] = useState();
  const [employee, setEmployee] = useState();

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
        <Navbar loggedIn = {loggedIn} setLoggedIn={setLoggedIn} admin = {admin} setAdmin = {setAdmin} employee={employee} setEmployee={setEmployee}/>
          <main className='app'>          
              <Routes>
                {loggedIn? 
                <>
                <Route path="/" element={<Home/>}/>
                <Route path="/deptOrders" element={<DeptOrders/>}/>
                <Route path="/myOrders" element={<MyOrders/>}/>
                <Route path="/myOrders/:id" element={<OrderDetails admin = {admin}/>}/>
                <Route path="/request" element={<Request/>}/>
                <Route path="/orderRequests" element={<OrderRequests/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/departments" element={<Departments/>}/>
                <Route path="/login" element={<Login loggedIn = {loggedIn} setLoggedIn={setLoggedIn} setAdmin={setAdmin}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path='/createDept' element={<CreateDept/>} />
                <Route path='/employeeLogin' element={<EmployeeLogin setLoggedIn={setLoggedIn} setAdmin={setAdmin} setEmployee={setEmployee}/>} />
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
                <Route path='/employeeLogin' element={<EmployeeLogin setLoggedIn={setLoggedIn} setAdmin={setAdmin} setEmployee={setEmployee}/>} />
                </>
                }   
              </Routes>          
          </main>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;