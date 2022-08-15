import React from 'react'
import "./Orders.css"
import { Button, Grid, Card } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Orders = () => {

    let navigate = useNavigate();

    const [action, setAction] = useState("all")

    const myorders = [
        {orderid: 1, title: "abc", quantity: 1000, product: "Sweater", material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022", status: "Completed", description: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum hdlkjash"},
        {orderid: 2, title: "abc", quantity: 100, product: "Cardigan", material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022",status: "Canceled", description: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum hdlkjash"},
        {orderid: 3, title: "abc", quantity: 1000, product: "Sweater", material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022", status: "Processing", description: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum hdlkjash"},
        {orderid: 4, title: "abc", quantity: 100, product: "Cardigan", material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022",status: "Canceled", description: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum hdlkjash"}
      ]

    let orders = myorders.filter((order) => {
        if(action === 'all'){
            return order;
        } else if (action === 'processing'){
            return order.status === "Processing"
        } else if (action === 'completed'){
            return order.status === "Completed"
        } else{
            return order.status === "Canceled"
        }
    })

  return (
    <main className='ordersContainer'>
        <Grid.Container gap={2} className="ordersGrid">
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("all")}>All</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("processing")}>Processing</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("completed")}>Completed</Button>
            </Grid>
            <Grid>
                <Button color="primary" shadow onClick={() => setAction("canceled")}>Canceled</Button>
            </Grid>
        </Grid.Container>
        <div className="ordersCardContainer">
            {orders.map((order) => (
                <Card isPressable isHoverable variant="bordered" className='orderCard' key={order.orderid}>
                    <Card.Body onClick={ () => navigate(`/myOrders/${order.orderid}`)}>
                        <h3>Order #{order.orderid}</h3>
                        <div className='orderBody'>
                            <p>Product: {order.product}</p>
                            <p>Due: {order.due} </p>
                            <p>Quantity: {order.quantity} BDT</p>
                            <p>Cost/Item: {order.price} BDT</p>
                        </div>
                        <div className='orderBody'>
                            <p>Material: {order.material} </p>
                            <p>Size: {order.size}</p>
                            <p>Color: {order.colorCode}</p>
                            <p>Total Cost: {order.price * order.quantity} BDT</p>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    </main>
  )
}

export default Orders