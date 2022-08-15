package com.theGonzalos.Overseer.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Orders {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int reqId;

    private String reqTitle;

    private String reqItem;

    private String reqItemSize;

    private String reqItemColor;

    private String reqItemMaterial;

    private int reqItemQuantity;

    private String reqDesc;

    private String reqStatus;

    private String feedback;

    @JsonFormat(pattern="yyyy-MM-dd")
    private java.sql.Date reqDate;

    private int reqCost;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User userId;


    @JsonIgnore
    @OneToMany(mappedBy = "order")
    private Set<Task> tasks = new HashSet<>();

    public int getReqId() {
        return reqId;
    }

    public void setReqId(int reqId) {
        this.reqId = reqId;
    }

    public String getReqTitle() {
        return reqTitle;
    }

    public void setReqTitle(String reqTitle) {
        this.reqTitle = reqTitle;
    }

    public String getReqDesc() {
        return reqDesc;
    }

    public void setReqDesc(String reqDesc) {
        this.reqDesc = reqDesc;
    }

    public String getReqStatus() {
        return reqStatus;
    }

    public void setReqStatus(String reqStatus) {
        this.reqStatus = reqStatus;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public java.sql.Date getReqDate() {
        return reqDate;
    }

    public void setReqDate(java.sql.Date reqDate) {
        this.reqDate = reqDate;
    }

    public int getReqCost() {
        return reqCost;
    }

    public void setReqCost(int reqCost) {
        this.reqCost = reqCost;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public String getReqItem() {
        return reqItem;
    }

    public void setReqItem(String reqItem) {
        this.reqItem = reqItem;
    }

    public String getReqItemSize() {
        return reqItemSize;
    }

    public void setReqItemSize(String reqItemSize) {
        this.reqItemSize = reqItemSize;
    }

    public String getReqItemColor() {
        return reqItemColor;
    }

    public void setReqItemColor(String reqItemColor) {
        this.reqItemColor = reqItemColor;
    }

    public int getReqItemQuantity() {
        return reqItemQuantity;
    }

    public void setReqItemQuantity(int reqItemQuantity) {
        this.reqItemQuantity = reqItemQuantity;
    }

    public String getReqItemMaterial() {
        return reqItemMaterial;
    }

    public void setReqItemMaterial(String reqItemMaterial) {
        this.reqItemMaterial = reqItemMaterial;
    }
}
