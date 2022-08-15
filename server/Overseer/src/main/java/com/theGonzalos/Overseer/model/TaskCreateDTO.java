package com.theGonzalos.Overseer.model;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TaskCreateDTO {

    private int reqID;

    @JsonFormat(pattern="yyyy-MM-dd")
    private java.sql.Date due;

    private String taskDetails;

    private int empID;

    public int getReqID() {
        return reqID;
    }

    public void setReqID(int reqID) {
        this.reqID = reqID;
    }

    public java.sql.Date getDue() {
        return due;
    }

    public void setDue(java.sql.Date due) {
        this.due = due;
    }

    public int getEmpID() {
        return empID;
    }

    public void setEmpID(int empID) {
        this.empID = empID;
    }

    public String getTaskDetails() {
        return taskDetails;
    }

    public void setTaskDetails(String taskDetails) {
        this.taskDetails = taskDetails;
    }


}
