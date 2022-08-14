package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
}
