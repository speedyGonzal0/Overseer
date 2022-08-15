import React from 'react'
import "./OrderDetails.css"
import { useParams } from 'react-router-dom'
import { Card, Table, Progress, Button, Input, Dropdown  } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import axios from "axios"

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState({})

  // const [taskDept, setTaskDept] = useState()
  // const [taskDue, setTaskDue] = useState()
  
  // const [orderTasks, setOrderTasks] = useState([])

  // const [departments, setDepartments] = useState([])

  useEffect(() => {
    // axios.get(`http://localhost:8080/tasks/order/${order.reqId}`).then((response) => {
    //   setOrderTasks(response.data);
    // });

    axios.get(`http://localhost:8080/orders/${id}`).then((response) => {
      setOrder(response.data);
    });

  }, [id])

  // const fetchDepartments = () => {
  //   axios.get("http://localhost:8080/employee/all").then((response) => {
  //     setDepartments(response.data);
  //   });
  //   axios.get(`http://localhost:8080/tasks/order/${order.reqId}`).then((response) => {
  //     setOrderTasks(response.data);
  //   });
    
  // }

  // const handleTaskSubmit = () => {
  //   axios.post("http://localhost:8080/tasks/create", {
  //           reqID: order.reqId,
  //           due: taskDue,
  //           empID: taskDept
  //       }, { withCredentials: true }).then((response) => {
  //           console.log(response);
  //       });

  // }


  return (
    <main className="orderDetailsContainer">
      <div className='orderDetailsBody'>
        <h1>{order.reqTitle}</h1>
        <div className="progress">
          <label>Progress</label>
          <Progress color="primary" value={25} />
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
      {/* { admin ? 
        <div className="adminActions">
          <div className="orderDetailsTasks">

            {orderTasks.map((orderTask) => (

              <Card key={orderTask.taskId}>
                <Card.Header>
                  <h3>{orderTask.taskId}</h3>
                </Card.Header>   
                <Card.Body>
                  <p>Task Status: {orderTask.taskStatus}</p>
                  <p>Task due: {orderTask.due}</p>
                  <p>Assigned to: {order.employee.employeeId}</p>
                </Card.Body>          

              </Card>
              

            ))}

          </div>
          <div className="orderDetailsTaskCreator">
            <Card>
              <Card.Body>
                <Input type="date" label='Set due date' onChange={(e) => setTaskDue(e.target.value)}></Input>
                <Dropdown>
                  <Dropdown.Button flat onClick={fetchDepartments}>Select Department</Dropdown.Button>
                  <Dropdown.Menu aria-label="Static Actions" selectedKeys={taskDept} onSelectionChange={setTaskDept}>
                    {departments.map((dept) => (
                      <Dropdown.Item key={dept.employeeId}>{dept.employeeName}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
              <Card.Footer>
                <Button onClick={handleTaskSubmit}> Create Task</Button>
              </Card.Footer >            
            </Card>
          </div>
        </div> :
        <></>  
    } */}
    </main>
  )
}

export default OrderDetails