package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.Employee;
import com.theGonzalos.Overseer.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAllEmployees")
    public List<Employee> listEmployee(){
        return employeeService.getAllEmployees();
    }

    @PostMapping("/registerEmployee")
    public String saveUser(@RequestBody Employee employee){
        employeeService.addEmployee(employee);
        return "New employee added";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Integer id){
        try {
            Employee employee = employeeService.getEmployee(id);
            return new ResponseEntity<Employee>(employee, HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Employee> getEmployeeByDept(@PathVariable Integer id){
//        try {
//            Employee employee = employeeService.getEmployeesByDeptId(id);
//            return new ResponseEntity<Employee>(employee, HttpStatus.OK);
//
//        }catch (NoSuchElementException e){
//            return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
//        }
//    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Integer id){
        employeeService.removeEmployee(id);
        return "Deleted employee with id "+ id;
    }

}
