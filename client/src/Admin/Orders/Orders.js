import React from 'react'
import "./Orders.css"
import { Button, Grid, Card, Input} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from "axios"

const Orders = () => {

    let navigate = useNavigate();

    const [action, setAction] = useState("all")
    const [allorders, setAllOrders] = useState([])
    const [searchedOrder, setSearchedOrder] = useState('');

    let orders;

      useEffect(() => {
         axios.get("http://localhost:8080/orders/all").then((response) => {
            console.log(response.data)
            setAllOrders(response.data.filter(data => {
                return data.reqStatus !== "Pending";
            }))
        })}, [])
   

    orders = allorders.filter((order) => {
        if(action === 'all'){
            return order;
        } else if (action === "search" && (order.reqId == searchedOrder || searchedOrder === "")){
            return order
        } else if (action === 'processing'){
            return order.reqStatus === "Processing"
        } else if (action === 'completed'){
            return order.reqStatus === "Completed"
        } else if (action === 'canceled'){
            return order.reqStatus === "Canceled"
        } else if(action === 'approved'){
            return order.reqStatus === "Approved"
        } else if(action === 'delivered'){
            return order.reqStatus === "Delivered"
        }
    })

    if(action === 'cost'){
        orders = allorders.sort((a, b) => ( (a.reqCost * a.reqItemQuantity) < (b.reqCost * b.reqItemQuantity) ) ? 1 : -1)
    } else if(action === 'quantity'){
        orders = allorders.sort((a, b) => (a.reqItemQuantity < b.reqItemQuantity) ? 1 : -1)
    }

  return (
    <main className='ordersContainer'>
        <h1>Orders</h1>
        <Input className='searchInput' bordered labelPlaceholder="Search order by ID" color="default" 
        onChange={(event) => {
            setAction("search")
            setSearchedOrder(event.target.value)
        }}/>
        <div className="ordersGrid">
        <h5>Filter</h5>
        <Grid.Container gap={2} className="ordersGridContainer">
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("all")}>All</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("approved")}>Approved</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("processing")}>Processing</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("completed")}>Completed</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("delivered")}>Delivered</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("canceled")}>Canceled</Button>
            </Grid>
        </Grid.Container>
        <h5>Sort</h5>
        <Grid.Container gap={2} className="ordersGridContainer">
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("cost")}>Cost</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("quantity")}>Quantity</Button>
            </Grid>
        </Grid.Container>
        </div>
        <div className="ordersCardContainer">
            {orders.map((order) => (
                <Card isPressable isHoverable variant="bordered" className='orderCard' key={order.reqId}>
                    <Card.Body onClick={ () => navigate(`/myOrders/${order.reqId}`)}>
                        <h3>Order #{order.reqId}</h3>
                        <div className='orderBody'>
                            <b>User: {order.userId.name}</b>
                            <b>Title: {order.reqTitle} </b>
                            <Button bordered size="sm">{order.reqStatus} </Button>
                        </div>
                        <Card.Divider/>
                        <div className='orderBody'>
                            <p>Product: {order.reqItem}</p>
                            <p>Due: {order.reqDate} </p>
                            <p>Quantity: {order.reqItemQuantity}</p>
                            <p>Cost/Item: {order.reqCost/order.reqItemQuantity} BDT</p>
                        </div>
                        <div className='orderBody'>
                            <p>Material: {order.reqItemMaterial} </p>
                            <p>Size: {order.reqItemSize}</p>
                            <p>Color: {order.reqItemColor}</p>
                            <p>Total Cost: {order.reqCost} BDT</p>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    </main>
  )
}

export default Orders