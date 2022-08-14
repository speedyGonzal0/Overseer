package com.theGonzalos.Overseer.model;


import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;

@Entity
public class Todo {
    //    todoID
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int todoID;

//    todoDetails
    private String todoDetails;
//    isChecked
    private boolean isChecked;
//    isDeleted
    @Value("false")
    private boolean isDeleted;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id", referencedColumnName = "taskId")
    private Task task;

    public Todo() {
    }

    public int getTodoID() {
        return todoID;
    }

    public void setTodoID(int todoID) {
        this.todoID = todoID;
    }

    public String getTodoDetails() {
        return this.todoDetails;
    }

    public void setTodoDetails(String todoDetails) {
        this.todoDetails = todoDetails;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public void setChecked(boolean checked) {
        isChecked = checked;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
