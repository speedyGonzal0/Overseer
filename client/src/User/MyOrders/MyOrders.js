import React from 'react'
import "./MyOrders.css"
import { Card, Input } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios"
const MyOrders = () => {

  let navigate = useNavigate();

  const [myOrders, setmyOrders] = useState([])
  const [searchedOrder, setSearchedOrder] = useState('');

  useEffect(() => {
    if(document.cookie){
      axios.get("http://localhost:8080/orders/user", {withCredentials : true}).then((response) => {
        setmyOrders(response.data)
        console.log(response.data);      
    });
    }
  
  }, [])

  let orders = myOrders.filter((order) => {
    if(searchedOrder === "") {
      return order
    } else if (order.reqTitle.toLowerCase().includes(searchedOrder.toLowerCase())){
      return order
    }
})
  

  return (
    <main className="myOrdersContainer">
      <h1>My Orders</h1>
      
      <Input className='searchInput' bordered labelPlaceholder="Search order by title" color="default" 
      onChange={(event) => {
        setSearchedOrder(event.target.value)
    }}/>

      {orders.map((order) => (
        <Card isPressable isHoverable variant="bordered" className='myOrdersCard' key={order.reqId}>
          <Card.Body onClick={ () => navigate(`/myOrders/${order.reqId}`)}>
            <h3>#{order.reqId} {order.reqTitle}</h3>
            <div className='myOrdersBody'>
              <p>Due: {order.reqDate} </p>
              <p>Total Cost: {order.reqCost} BDT</p>
              <Button bordered size="sm">{order.reqStatus} </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </main>
  )
}

export default MyOrders