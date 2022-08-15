import React from 'react'
import "./MyOrders.css"
import { Card, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios"
const MyOrders = () => {

  let navigate = useNavigate();

  const myOrders = [
    {orderid: 1, title: "abc", quantity: 1000, material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022", status: "Pending"},
    {orderid: 2, title: "abc", quantity: 100, material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022",status: "Pending"}
  ]


  useEffect(() => {
    if(document.cookie){
      axios.get("http://localhost:8080/orders/user", {withCredentials : true}).then((response) => {
      // setLoggedIn(false);
      // navigate("/login");
      console.log(response.data);      
    });
    }
  
  }, [])
  

  return (
    <main className="myOrdersContainer">
      <h1>My Orders</h1>
      {myOrders.map((order) => (
        <Card isPressable isHoverable variant="bordered" className='myOrdersCard' key={order.orderid}>
          <Card.Body onClick={ () => navigate(`/myOrders/${order.orderid}`)}>
            <h3> #{order.orderid} {order.title}</h3>
            <div className='myOrdersBody'>
              <p>Due: {order.due} </p>
              <p>Total Cost: {order.price * order.quantity} BDT</p>
              <p>Status: {order.status} </p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </main>
  )
}

export default MyOrders