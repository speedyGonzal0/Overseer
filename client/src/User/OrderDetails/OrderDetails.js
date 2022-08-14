import React from 'react'
import "./OrderDetails.css"
import { useParams } from 'react-router-dom'
import { Card, Table, Progress } from "@nextui-org/react";

const OrderDetails = () => {

    const {id} = useParams();
    const myOrders = [
        {orderid: 1, title: "abc", quantity: 1000, material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022", status: "Accepted", description: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum hdlkjash"},
        {orderid: 2, title: "abc", quantity: 100, material: "Nylon", size: "M", price: 40, colorCode: "#A7Dh23", due: "10-Aug-2022",status: "Accepted", description: "dasdhaskjdhjwkjhiudwahdaksjdhjksa dhaskjdh jksahdjkhsakj Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum hdlkjash"}
      ]

  return (
    <main className="orderDetailsContainer">
      {myOrders.filter(order => order.orderid == id).map(filteredorder => (
        <body className='orderDetailsBody'>
          <h1>{filteredorder.title}</h1>
          <div className="progress">
            <label>Progress</label>
            <Progress color="primary" value={25} />
          </div>
          <div className="orderDetailsTable">
            <Table>
              <Table.Header>
                <Table.Column>#ORDER</Table.Column>
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
                  <Table.Cell>{filteredorder.orderid}</Table.Cell>
                  <Table.Cell>{filteredorder.quantity}</Table.Cell>
                  <Table.Cell>{filteredorder.material}</Table.Cell>
                  <Table.Cell>{filteredorder.size}</Table.Cell>
                  <Table.Cell>{filteredorder.price * filteredorder.quantity}</Table.Cell>
                  <Table.Cell>{filteredorder.colorCode}</Table.Cell>
                  <Table.Cell>{filteredorder.due}</Table.Cell>
                  <Table.Cell>{filteredorder.status}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <Card>
            <Card.Body>
              <p>{filteredorder.description}</p>
            </Card.Body>
          </Card>
        </body>
      ))}
    </main>
  )
}

export default OrderDetails