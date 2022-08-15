package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.Orders;
import com.theGonzalos.Overseer.service.OrdersService;
import com.theGonzalos.Overseer.service.UserService;
import org.aspectj.weaver.ast.Or;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<Orders> listRequests(){
        return ordersService.getAllRequests();
    }

    @PostMapping("/create")
    public String sendRequests(@RequestBody Orders order, HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        String username = cookies[0].getValue();
        order.setReqStatus("Pending");
        ordersService.sendRequests(order, username);
        return "New request sent";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getRequest(@PathVariable Integer id){
        try {
            Orders request = ordersService.getRequest(id);
            return new ResponseEntity<Orders>(request, HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Orders>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user")
    public List<Orders> getUserOrders(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        String userEmail = cookies[0].getValue();
        return ordersService.getOrdersOfUser(userEmail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateRequest(@RequestBody Orders request, @PathVariable Integer id){
        try {
            Orders existingRequest = ordersService.getRequest(id);
            existingRequest.setFeedback(request.getFeedback());
            existingRequest.setReqCost(request.getReqCost());
            existingRequest.setReqDate(request.getReqDate());
            ordersService.sendOrder(existingRequest);
//            ordersService.sendRequests(existingRequest);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Orders>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping(value = "/{action}/{orderID}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> updateOrderStatus(@PathVariable Integer orderID, @PathVariable String action){
        try {
            Orders order = ordersService.getRequest(orderID);

            switch (action){
                case "approve": order.setReqStatus("Approved"); break;
                case "cancel": order.setReqStatus("Canceled"); break;
                case "complete": order.setReqStatus("Completed"); break;
                case "deliver": order.setReqStatus("Delivered"); break;
            }
//            order.setReqStatus("Completed");
            ordersService.sendOrder(order);
            JSONObject resp = new JSONObject();
            resp.put("message","Marked order as " + action);
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error finding order");
            return new ResponseEntity<>(resp.toString(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Integer id){
        ordersService.deleteRequest(id);
        return "Deleted request with id "+ id;
    }

}
