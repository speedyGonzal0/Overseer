package com.theGonzalos.Overseer.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Task {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int taskId;

    private String taskStatus;

    private String taskDetails;

    private boolean isDeleted;

    @JsonFormat(pattern="yyyy-MM-dd")
    private java.sql.Date due;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="order_id", referencedColumnName = "reqId")
    private Orders order;

    @JsonIgnore
    @OneToMany(mappedBy = "task")
    private Set<Todo> todos = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId")
    private Employee employee;

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int task_id) {
        this.taskId = task_id;
    }

    public java.sql.Date getDue() {
        return due;
    }

    public void setDue(java.sql.Date due) {
        this.due = due;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Set<Todo> getTodos() {
        return todos;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public String getTaskDetails() {
        return taskDetails;
    }

    public void setTaskDetails(String taskDetials) {
        this.taskDetails = taskDetials;
    }

}
