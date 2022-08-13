import React from 'react'
import "./DeptOrders.css"
import { Collapse, Checkbox, Button } from '@nextui-org/react';

const DeptOrders = () => {

    const deptName = "Pipo"

    const tasks = [
        {orderid: 1, tasks: ["popo", "pipola", "ponty", "punupunu"]},
        {orderid: 2, tasks: ["popo", "pipola", "ponty", "punupunu"]},
        {orderid: 3, tasks: ["popo", "pipola", "ponty", "punupunu"]}
      ]

  return (
    <main className='deptOrdersContainer'>
        <h1>{deptName} Department Orders</h1>
        <Collapse.Group className='deptOrders'>
        {
            tasks.map((task) => (
                <Collapse className='order' title={`Order ID: ${task.orderid}`}>
                    <Checkbox.Group
                    color="primary"
                    label="Assigned Tasks">
                        {task.tasks.map((task) => 
                        <Checkbox value={task}>{task}</Checkbox>
                        )}
                    </Checkbox.Group>
                    <div className='deptBtn'><Button>Mark as complete</Button></div>
                </Collapse>
            ))
        }
        </Collapse.Group>
    </main>
  )
}

export default DeptOrders