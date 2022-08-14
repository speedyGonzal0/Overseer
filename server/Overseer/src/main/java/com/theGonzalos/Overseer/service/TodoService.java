package com.theGonzalos.Overseer.service;


import com.theGonzalos.Overseer.model.Task;
import com.theGonzalos.Overseer.model.Todo;
import com.theGonzalos.Overseer.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodosOfTask(Integer taskId){
        return todoRepository.findAllByTask_TaskIdAndIsDeletedFalse(taskId);
    }

    public void createTodo(Todo todo, Task task){
        todo.setTask(task);
        todoRepository.save(todo);
    }

    public Todo findTodoByID(Integer todoID){
        return todoRepository.findById(todoID).get();
    }


    public void updateTodo(Todo todo){
        todoRepository.save(todo);
    }


    public void deleteTodo(Integer todoId){
        Todo todo = todoRepository.findById(todoId).get();
        todo.setDeleted(true);
        todoRepository.save(todo);
//        todoRepository.delete(todo);
    }



}
