import React from 'react'
import "./OrderDetails.css"
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Table, Progress, Button, Input, Dropdown, Textarea } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import axios from "axios"

const OrderDetails = () => {

  const { id } = useParams();
  let navigate = useNavigate();

  const [order, setOrder] = useState({})
  const [tasks, setTasks] = useState([])
  const [departments, setDepartments] = useState([])
  const [taskDue, setTaskDue] = useState()
  const [taskDeptID, setTaskDeptID] = useState(0)
  const [taskDetails, setTaskDetails] = useState("")






  useEffect(() => {
    axios.get(`http://localhost:8080/orders/${id}`).then((response) => {
      setOrder(response.data);
    });

    axios.get(`http://localhost:8080/tasks/order/${id}`).then((response) => {
      setTasks(response.data);
    });

    axios.get("http://localhost:8080/employee/all").then((response) => {
      setDepartments(response.data)
    })


  }, [id])

  const progressBar = (progress) => {
    if (progress === "Pending") {
      return 20;
    } else if (progress === "Approved") {
      return 40;
    } else if (progress === "Processing") {
      return 60;
    } else if (progress === "Completed") {
      return 80;
    } else if (progress === "Delivered") {
      return 100;
    } else if (progress === "Canceled") {
      return 0;
    }
  }

  const submitTask = () => {

    axios.post("http://localhost:8080/tasks/create", {
      reqID: id,
      due: taskDue,
      empID: taskDeptID.currentKey,
      taskDetails: taskDetails
    }).then((response) => {
      if (response.data.message) {
        navigate(`/myOrders/${id}`, { replace: true });
        console.log(response.data.message);
      }
      else {
        console.log(response.data);
      }
    });
  }

  const markDelivered = () => {
    axios.put(`http://localhost:8080/orders/deliver/${id}`, {}).then((response) => {
      if(response.data.message){
        console.log(response.data.message)
        navigate(`/myOrders/${id}`)
      }
    })
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
            <p>Description: {order.reqDesc}</p>
          </Card.Body>
        </Card>
      </div>
      {window.localStorage.getItem("isAdmin") === "true" ?
        <div className="orderDetailsAdminPanel">
          <div className="orderDetailsMarkDelivered">
            <Button onClick={markDelivered}>Mark as delivered</Button>
          </div>
          <div className="orderDetailsAdminAssign">
            <h3>Assigned Tasks</h3>
            {tasks.length === 0 ? <></> :
              tasks.map((task) => (
                <Card isHoverable variant="bordered" key={task.taskId}>
                  <Card.Body className='assignedTaskCard' >

                    <div className='orderBody'>
                      <h3>Task #{task.taskId}</h3>
                      <Button bordered size="sm"> {task.taskStatus}</Button>
                    </div>
                    <Card.Divider />
                    <div className='orderBody'>
                      <p>Due: {task.due}</p>
                      <p>Department: {task.employee.employeeName}</p>
                    </div>
                    <div className='orderBody'>
                      <p>Task details: {task.taskDetails} </p>
                    </div>
                  </Card.Body>
                </Card>

              ))
            }
          </div>
          <div className="orderDetailsAdminCreate">
            <h3>Create a task</h3>
            <Card variant="bordered">
              <Card.Body className='taskCreateCardBody'>

                <div className='orderBody'>
                  <Input label='Task due date' type="date" onChange={(e) => {setTaskDue(e.target.value)}} />
                  <Dropdown>
                    <Dropdown.Button flat>
                      {taskDeptID}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Single selection actions"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={taskDeptID}
                      onSelectionChange={setTaskDeptID}
                    >
                      {departments.length === 0 ?
                        <Dropdown.Item key="0">0</Dropdown.Item> :
                        departments.map((dept) => (
                          <Dropdown.Item key={dept.employeeId}>{dept.employeeName} : {dept.employeeId}</Dropdown.Item>

                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div>
                  <Textarea label='Enter task details' width='100%' onChange={(e) => {setTaskDetails(e.target.value)}} />
                </div>
                <Card.Divider />
                <div className="taskCreateButton">
                  <Button onClick={submitTask}> Create task </Button>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div> :
        <></>
      }
    </main>
  )
}

export default OrderDetails