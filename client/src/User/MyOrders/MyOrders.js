import React from 'react'
import "./MyOrders.css"
import { Card, Button } from "@nextui-org/react";
import {Link} from "react-router-dom"

const MyOrders = () => {

  const myOrders = [
    {orderid: 1, title: "abc", quantity: 1000, material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022", status: "Pending"},
    {orderid: 2, title: "abc", quantity: 100, material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022",status: "Pending"}
  ]

  return (
    <main className="myOrdersContainer">
      <h1>My Orders</h1>
      {myOrders.map((order) => (
        <Card isPressable isHoverable variant="bordered" className='myOrdersCard'>
          <Card.Body>
            <h3> #{order.orderid} {order.title}</h3>
            <body>
              <p>Due: {order.due} </p>
              <p>Total Cost: {order.price * order.quantity} BDT</p>
              <p>Status: {order.status} </p>
            </body>
            <Link to={`/myOrders/${order.orderid}`}><Button shadow color="primary">View</Button></Link>
          </Card.Body>
        </Card>
      ))}
    </main>
  )
}

export default MyOrders