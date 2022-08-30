import React from 'react'
import "./OrderRequests.css"
import { Button, Card } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import axios from "axios"

const OrderRequests = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/orders/all").then((response) => {
            setOrders(response.data.filter(data => {
                return data.reqStatus === "Pending";
            }))
        })
    }, [orders])

    const handleApprove = (id) => {
        axios.put(`http://localhost:8080/orders/approve/${id}`).then(
            (response) => {
                console.log(response)
            }
        );
    };

    const handleCancel = (id) => {
        axios.put(`http://localhost:8080/orders/cancel/${id}`).then(
            (response) => {
                console.log(response)
            }
        );
    }

    return (
        <main className='orderReqContainer'>
            <h1>Order Requests</h1>
            {orders.map((order) => (
                <div className="orderRequests" key={order.reqId}>
                    <Card auto color="warning" isHoverable>
                        <Card.Body className='orderRequestCard'>
                            <h3>{order.reqTitle}</h3>
                            <Card.Divider/>
                            <div className="orderReqBody">
                                <div className="orderReqAttr">
                                    <b>Order ID: {order.reqId}</b>
                                    <b>Ordered by: {order.userId.name}</b>
                                </div>

                                <div className="orderReqAttr">
                                    <p>Due: {order.reqDate}</p>
                                    <p>Product: {order.reqItem}</p>
                                </div>
                                <div className="orderReqAttr">
                                    <p>Material: {order.reqItemMaterial}</p>
                                    <p>Size: {order.reqItemSize}</p>
                                </div>
                                <div className="orderReqAttr">
                                    <p>Color Code: {order.reqItemColor}</p>
                                    <p>Quantity: {order.reqItemQuantity}</p>
                                </div>
                                <div className="orderReqAttr">
                                    <p>Cost/Item: {order.reqCost / order.reqItemQuantity} BDT</p>
                                    <p>Total Cost: {order.reqCost} BDT</p>
                                </div>
                            </div>

                            <p> Description: {order.reqDesc}</p>
                            <Card.Divider/>
                            <div className='orderReqBtn'>
                                <Button  onClick={() => handleApprove(order.reqId)}>Approve</Button>
                                <Button bordered  color="error" onClick={() => handleCancel(order.reqId)}>Cancel</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </main>
    )
}

export default OrderRequests