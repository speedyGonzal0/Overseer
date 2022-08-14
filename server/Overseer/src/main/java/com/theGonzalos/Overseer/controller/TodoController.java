package com.theGonzalos.Overseer.controller;


import com.theGonzalos.Overseer.model.Task;
import com.theGonzalos.Overseer.model.Todo;
import com.theGonzalos.Overseer.model.TodoCreateDTO;
import com.theGonzalos.Overseer.service.TaskService;
import com.theGonzalos.Overseer.service.TodoService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;


    @Autowired
    private TaskService taskService;

    @GetMapping("/task/{taskId}")
    public List<Todo> getTodosOfTask(@PathVariable Integer taskId){
        return todoService.getAllTodosOfTask(taskId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTodo(@RequestBody TodoCreateDTO todo){

        try {
            Task task = taskService.getTaskByID(todo.getTaskId());

            for (Todo t : todo.getTodos()){
                todoService.createTodo(t, task);
            }
            JSONObject resp = new JSONObject();
            resp.put("message","Todos added");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error creating todo");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{todoID}")
    public ResponseEntity<?> updateTodo(@PathVariable Integer todoID){

        try {
            Todo existingTodo = todoService.findTodoByID(todoID);
            existingTodo.setChecked(!existingTodo.isChecked());
            todoService.updateTodo(existingTodo);

            JSONObject resp = new JSONObject();
            resp.put("message","Todo updated");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error updating todo");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }

    }



    @PutMapping("/delete/{todoID}")
    public ResponseEntity<?> deleteTodo(@PathVariable Integer todoID){
        try{
            todoService.deleteTodo(todoID);
            JSONObject resp = new JSONObject();
            resp.put("message","Todo successfully deleted");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error finding todo");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

}
