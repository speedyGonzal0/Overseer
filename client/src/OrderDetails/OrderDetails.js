import React from 'react'
import "./OrderDetails.css"
import { useParams } from 'react-router-dom'
import { Card, Table, Progress } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import axios from "axios"

const OrderDetails = () => {

    const {id} = useParams();

    const [order, setOrder] = useState({})

    useEffect(() => {
      axios.get(`http://localhost:8080/orders/${id}`).then((response) => {
      setOrder(response.data);
    });
    }, [id])

    const progressBar = (progress) =>{
      if (progress === "Pending") {
        return 20;
      } else if (progress === "Approved"){
        return 40;
      } else if (progress === "Processing"){
        return 60;
      } else if (progress === "Complete"){
        return 80;
      } else if (progress === "Delivered"){
        return 100;
      } else if (progress === "Canceled"){
        return 0;
      }
    }
    

  return (
    <main className="orderDetailsContainer">
        <div className='orderDetailsBody'>
        <h1>{order.reqTitle}</h1>
          <div className="progress">
            <label>Progress</label>
            <Progress color="primary" value={progressBar(order.reqStatus)} />
          </div>
          <div className="orderDetailsTable">
            <Table aria-label="Order Details Table">
              <Table.Header>
                <Table.Column>#ORDER</Table.Column>
                <Table.Column>PRODUCT</Table.Column>
                <Table.Column>QUANTITY</Table.Column>
                <Table.Column>MATERIAL</Table.Column>
                <Table.Column>SIZE</Table.Column>
                <Table.Column>PRICE</Table.Column>
                <Table.Column>COLOR CODE</Table.Column>
                <Table.Column>DUE</Table.Column>
                <Table.Column>STATUS</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>{order.reqId}</Table.Cell>
                  <Table.Cell>{order.reqItem}</Table.Cell>
                  <Table.Cell>{order.reqItemQuantity}</Table.Cell>
                  <Table.Cell>{order.reqItemMaterial}</Table.Cell>
                  <Table.Cell>{order.reqItemSize}</Table.Cell>
                  <Table.Cell>{order.reqCost}</Table.Cell>
                  <Table.Cell>{order.reqItemColor}</Table.Cell>
                  <Table.Cell>{order.reqDate}</Table.Cell>
                  <Table.Cell>{order.reqStatus}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <Card>
            <Card.Body>
              <p>{order.reqDesc}</p>
            </Card.Body>
          </Card>
        </div>
    </main>
  )
}

export default OrderDetails