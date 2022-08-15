package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.Employee;
import com.theGonzalos.Overseer.model.Orders;
import com.theGonzalos.Overseer.model.Task;
import com.theGonzalos.Overseer.model.TaskCreateDTO;
import com.theGonzalos.Overseer.service.EmployeeService;
import com.theGonzalos.Overseer.service.OrdersService;
import com.theGonzalos.Overseer.service.TaskService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;



@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private OrdersService requestsService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/all")
    public List<Task> listTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping("/create")
    public ResponseEntity<?> setTask(@RequestBody TaskCreateDTO task){

        Orders request = requestsService.getRequest(task.getReqID());
        Employee employee = employeeService.getEmployee(task.getEmpID());

        if(request == null || employee == null){
            JSONObject resp = new JSONObject();
            resp.put("message","Invalid order ID");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }

        Task newTask = new Task();
        newTask.setOrder(request);
        request.setReqStatus("Processing");
        newTask.setEmployee(employee);
        newTask.setDue(task.getDue());
        newTask.setTaskStatus("Pending");
        taskService.setTask(newTask);
        JSONObject resp = new JSONObject();
        resp.put("message","Added new task to the order");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }

    @GetMapping("/order/{reqId}")
    public List<Task> getAllTasksByReqId(@PathVariable Integer reqId){
        return taskService.getTasksByReqId(reqId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskByID(@PathVariable Integer id){
        try {
            Task task = taskService.getTaskByID(id);
            return new ResponseEntity<Task>(task, HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateDate/{id}")
    public ResponseEntity<Task> updateTaskDate(@RequestBody Task task, @PathVariable Integer id){
        try {
            Task existingTask = taskService.getTaskByID(id);
//            existingTask.setTodos(task.getTodos());
            existingTask.setDue(task.getDue());
            taskService.setTask(existingTask);
            JSONObject resp = new JSONObject();
            resp.put("message","Successfully updated Task");
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (NoSuchElementException e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error finding task");
            return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/complete/{taskID}")
    public ResponseEntity<?> markTaskDone(@PathVariable Integer taskID){
        try {
            Task task = taskService.getTaskByID(taskID);
            task.setTaskStatus("Completed");
            taskService.setTask(task);
            JSONObject resp = new JSONObject();
            resp.put("message","Marked task as done");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);

        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error finding task");
            return new ResponseEntity<>(resp.toString(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{taskID}/employee/{empID}")
    public ResponseEntity<?> assignTaskToEmployee(@PathVariable Integer taskID, @PathVariable Integer empID){
        try {
            Employee employee = employeeService.getEmployee(empID);
            Task newTask = taskService.getTaskByID(taskID);
            newTask.setEmployee(employee);
            taskService.setTask(newTask);
            JSONObject resp = new JSONObject();
            resp.put("message","Successfully assigned task to employee");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error assigning task");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id){
        try {
            Task task = taskService.getTaskByID(id);
            task.setDeleted(true);
            taskService.setTask(task);
            JSONObject resp = new JSONObject();
            resp.put("message","Task successfully deleted");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);


        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error deleting task");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

}
