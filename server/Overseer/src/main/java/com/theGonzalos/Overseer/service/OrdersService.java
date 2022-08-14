package com.theGonzalos.Overseer.service;

import com.theGonzalos.Overseer.model.Orders;
import com.theGonzalos.Overseer.model.User;
import com.theGonzalos.Overseer.repository.OrdersRepository;
import com.theGonzalos.Overseer.repository.UserRepository;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Orders> getAllRequests(){
        return ordersRepository.findAll();
    }

    public void sendRequests(Orders request, String username){
        User savedUser = userRepository.findByEmail(username);
        request.setUserId(savedUser);
//        request.setUserId();
        ordersRepository.save(request);
    }

    public void sendOrder(Orders order){
        ordersRepository.save(order);

    }
    public Orders getRequest(Integer reqId){
        return ordersRepository.findById(reqId).get();
    }

    public void deleteRequest(Integer reqId){
        ordersRepository.deleteById(reqId);
    }

}
