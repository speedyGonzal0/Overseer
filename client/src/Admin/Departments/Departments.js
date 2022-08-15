import React from 'react'
import "./Departments.css"
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Collapse, Grid } from "@nextui-org/react";
import axios from "axios"

const Departments = () => {

  const [departments, setDepartments] = useState([])

  useEffect(() => {

    axios.get("http://overseerserver-env.eba-y32sh6qs.ap-south-1.elasticbeanstalk.com/employee/all").then((response) => {
      setDepartments(response.data)
    })
  }, [])

  const [deptID, setDeptID] = useState(0)

  const [deptTasks, setDeptTasks] = useState([])

  // const [taskTodos, setTaskTodos] = useState([])


  const fetchDeptTasks = (dept) => {
    setDeptID(departments.indexOf(dept));
    axios.get(`http://overseerserver-env.eba-y32sh6qs.ap-south-1.elasticbeanstalk.com/employee/tasks/${dept.employeeId}`).then((response) => {
      setDeptTasks(response.data)
    })
  }

  // const fetchTaskTodos = (taskID) => {
  //   axios.get(`http://overseerserver-env.eba-y32sh6qs.ap-south-1.elasticbeanstalk.com/todo/task/${taskID}`).then((response) => {
  //     setTaskTodos(response.data)
  //   })
  // }

  return (
    <main className="deptContainer">
      <h1>List of Departments</h1>
      <Container>
        <Row gap={1}>
          {departments.map(dept => (
            <Col key={dept.employeeId}>
              <Card isPressable className='deptCard' onClick={() => fetchDeptTasks(dept)}>
                <Card.Body>
                  <h3>{dept.employeeName}</h3>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="deptActivity">

        <h2>{departments.length !== 0 ? departments[deptID].employeeName : ""} Department Activity</h2>
        <Grid.Container gap={2}>
          <Grid className="deptTodo">
            <Collapse.Group splitted>
              {deptTasks.map(task => (

                <Collapse key={task.taskId} title={task.taskId} subtitle={`Under order id #${task.order.reqId}`}>
                  <h3>{task.taskStatus}</h3>
                  <p>{task.taskDetails}</p>
                  {/* {taskTodos.map(todo => (
                    <li key={todo.todoID}>{todo.todoDetails}</li>
                  ))} */}
                </Collapse>
              ))}

            </Collapse.Group>
          </Grid>
        </Grid.Container>
      </div>
    </main>
  )
}

export default Departments