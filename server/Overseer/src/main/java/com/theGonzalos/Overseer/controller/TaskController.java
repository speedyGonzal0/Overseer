package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.Requests;
import com.theGonzalos.Overseer.model.Task;
import com.theGonzalos.Overseer.service.RequestsService;
import com.theGonzalos.Overseer.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/getAllTasks")
    public List<Task> listTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping("/setTask")
    public String setTask(@RequestBody Task task){
        taskService.setTask(task);
        return "New task set";
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

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateRequest(@RequestBody Task task, @PathVariable Integer id){
        try {
            Task existingTask = taskService.getTaskByID(id);
            existingTask.setTasks(task.getTasks());
            existingTask.setDue(task.getDue());
            taskService.setTask(existingTask);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Integer id){
        taskService.deleteTask(id);
        return "Deleted task with id "+ id;
    }

}
