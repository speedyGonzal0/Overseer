package com.theGonzalos.Overseer.service;

import com.theGonzalos.Overseer.model.Employee;
import com.theGonzalos.Overseer.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void addEmployee(Employee employee){
        employeeRepository.save(employee);
    }

    public Employee getEmployee(Integer employee_id){
        return employeeRepository.findById(employee_id).get();
    }

    public Employee getEmployee(String email, String pass) { return employeeRepository.getEmployeeByEmployeeEmailAndEmployeePass(email, pass); }

    public void removeEmployee(Integer employee_id){
        employeeRepository.deleteById(employee_id);
    }

}
