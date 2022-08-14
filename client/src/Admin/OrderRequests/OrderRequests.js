import React from 'react'
import "./OrderRequests.css"
import { Button, Card } from "@nextui-org/react";

const OrderRequests = () => {

    const myOrders = [
        {orderid: 1, title: "abc", quantity: 1000, product:"Sweater", material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10/07/2022", status: "Accepted", comments: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"},
        {orderid: 2, title: "bcd", quantity: 100, product:"Cardigan", material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10/07/2022",status: "Accepted", comments: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"}
      ]

  return (
    <main className='orderReqContainer'>
        <h1>Order Requests</h1>
        {myOrders.map((order) => (
            <div className="orderRequests">
                <Card auto color="warning" isHoverable shadow>
                    <Card.Body className='orderRequestCard'>
                        <h3>{order.title}</h3>
                        <div className="orderReqBody">
                            <div className="orderReqAttr">
                                <p>Due: {order.due}</p>
                                <p>Product: {order.product}</p>
                            </div>
                            <div className="orderReqAttr">
                                <p>Material: {order.material}</p>
                                <p>Size: {order.size}</p>
                            </div>
                            <div className="orderReqAttr">
                                <p>Color Code: {order.colorCode}</p>
                                <p>Quantity: {order.quantity}</p>
                            </div>
                            <div className="orderReqAttr">
                                <p>Cost/Item: {order.price} BDT</p>
                                <p>Total Cost: {order.quantity * order.price} BDT</p>
                            </div>
                        </div>
                    
                        <p>{order.comments }</p>
                        <div className='orderReqBtn'>
                            <Button size="sm" shadow>Approve</Button>
                            <Button size="sm" shadow color="error" >Cancel</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        ))}
    </main>
  )
}

export default OrderRequests