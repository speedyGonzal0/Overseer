import React from 'react'
import "./DeptOrders.css"
import { Collapse, Checkbox, Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import axios from "axios"

const DeptOrders = () => {

    // const deptName = "Pipo"

    // const tasks = [
    //     {orderid: 1, tasks: ["popo", "pipola", "ponty", "punupunu"]},
    //     {orderid: 2, tasks: ["popo", "pipola", "ponty", "punupunu"]},
    //     {orderid: 3, tasks: ["popo", "pipola", "ponty", "punupunu"]}
    //   ]

    const [tasks, setTasks] = useState([])
    // const [todos, setTodos] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/employee/tasks", {withCredentials:true}).then((response) => {
            console.log(response.data)
            setTasks(response.data)
        })
    }, [])

    // const fetchTaskTodos = (taskId) => {
    //     axios.get(`http://localhost:8080/todo/task/${taskId}`).then((response) => {
    //         setTodos(response.data)
    //     })
    // }

    const markTaskDone = (taskId) => {
        axios.put(`http://localhost:8080/tasks/complete/${taskId}`).then((response) => {
            console.log(response)
        })
    }


  return (
    <main className='deptOrdersContainer'>
        <h1>{tasks.length === 0 ? "" : tasks[0].employee.employeeName} Department Tasks</h1>
        <Collapse.Group className='deptOrders'>
        {
            tasks.map((task) => (
                <Collapse key={task.taskId} className='order' title={`Task ID: ${task.taskId}`}>
                    <p>{task.taskDetails}</p>
                    <div className='deptBtn'><Button shadow color="primary" onClick={()=> markTaskDone(task.taskId)}>Mark As Done</Button></div>
                </Collapse>
            ))
        }
        </Collapse.Group>
    </main>
  )
}

export default DeptOrders