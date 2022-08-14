import React from 'react'
import "./Departments.css"
import { useState } from 'react';
import { Container, Card, Row, Col, Collapse, Grid} from "@nextui-org/react";

const Departments = () => {

  const departments = [
    {deptid: 1, deptname: "Fabric Sourcing", taskid: 1213, orderid: 1, todos: ["eat grass & pee out loud", "cry in poop", "drink bread"], status: "Pending"}, 
    {deptid: 2, deptname: "Trims & Accessory", taskid: 1213, orderid: 1, todos: ["eat grass & pee out loud", "cry in poop", "drink bread"], status: "Pending"},
    {deptid: 3, deptname: "Cutting & Sewing", taskid: 1213, orderid: 1, todos: ["eat grass & pee out loud", "cry in poop", "drink bread"], status: "Pending"}, 
    {deptid: 4, deptname: "Garment Washing", taskid: 1213, orderid: 1, todos: ["eat grass & pee out loud", "cry in poop", "drink bread"], status: "Pending"}, 
    {deptid: 5, deptname: "Coloring & Embroidery", taskid: 1213, orderid: 1, todos: ["eat grass & pee out loud", "cry in poop", "drink bread"], status: "Pending"}
]

  const [dept, setDept] = useState(0)

  return (
    <main className="deptContainer">
      <h1>List of Departments</h1>
      <Container>
      <Row gap={1}>
        {departments.map(dept => (
          <Col key={dept.deptid}>
          <Card isPressable className='deptCard' onClick={() => setDept(dept.deptid - 1)}>
            <Card.Body>
              <h3>{dept.deptname}</h3>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
    <div className="deptActivity">
      <h2>{departments[dept].deptname} Department Activity</h2>
      <Grid.Container gap={2}>
        <Grid className="deptTodo">
          <Collapse.Group splitted>
            <Collapse title={departments[dept].taskid} subtitle= {`Under order id #${departments[dept].orderid}`}>
            <h4>{departments[dept].status}</h4>
              {departments[dept].todos.map(todo => (
                <li key={todo}>{todo}</li>
              ))}
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </div>
    </main>
  )
}

export default Departments