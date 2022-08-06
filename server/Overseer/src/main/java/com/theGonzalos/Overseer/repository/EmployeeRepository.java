package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
