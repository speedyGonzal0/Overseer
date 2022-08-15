import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login/Login.js';
import Register from './Register/Register';
import DeptOrders from './Employee/DeptOrders/DeptOrders';
import MyOrders from './User/MyOrders/MyOrders';
import Request from './User/Request/Request';
import OrderDetails from './OrderDetails/OrderDetails';
import OrderRequests from './Admin/OrderRequests/OrderRequests';
import Orders from './Admin/Orders/Orders';
import Departments from './Admin/Departments/Departments';
import Navbar from './Navbar/Navbar';
import { NextUIProvider } from '@nextui-org/react';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <NextUIProvider>
      <BrowserRouter>
        <Navbar loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
          <main className='app'>          
              <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/deptOrders" element={<DeptOrders/>}/>
                <Route path="/myOrders" element={<MyOrders/>}/>
                <Route path="/myOrders/:id" element={<OrderDetails/>}/>
                <Route path="/request" element={<Request/>}/>
                <Route path="/orderRequests" element={<OrderRequests/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/departments" element={<Departments/>}/>
              </Routes>          
          </main>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;