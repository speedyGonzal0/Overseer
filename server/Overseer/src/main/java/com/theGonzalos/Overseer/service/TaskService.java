package com.theGonzalos.Overseer.service;

import com.theGonzalos.Overseer.model.Task;
import com.theGonzalos.Overseer.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public void setTask(Task task){
        taskRepository.save(task);
    }

    public Task getTaskByID(Integer taskID){
        return taskRepository.findById(taskID).get();
    }

    public void deleteTask(Integer taskID){
        taskRepository.deleteById(taskID);
    }
}
