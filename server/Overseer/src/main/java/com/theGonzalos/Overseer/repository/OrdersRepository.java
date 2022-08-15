package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.Orders;
import org.hibernate.criterion.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    List<Orders> findAllByUserId_Email(String email);
}
