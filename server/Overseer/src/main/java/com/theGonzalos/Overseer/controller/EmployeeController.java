package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.Employee;
import com.theGonzalos.Overseer.model.LoginRequestDTO;
import com.theGonzalos.Overseer.model.Task;
import com.theGonzalos.Overseer.service.EmployeeService;
import com.theGonzalos.Overseer.service.TaskService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/all")
    public List<Employee> listEmployee(){
        return employeeService.getAllEmployees();
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveEmployee(@RequestBody Employee employee){
        try {
            employeeService.addEmployee(employee);

            JSONObject resp = new JSONObject();
            resp.put("message","Employee registration successful");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);

        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message","Error registering employee");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> employeeSignIn(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse response){

        Employee employee = employeeService.getEmployee(loginRequestDTO.getEmail(), loginRequestDTO.getPassword());

        if(employee == null){
            JSONObject resp = new JSONObject();
            resp.put("message","employee email or password do not match");
            return new ResponseEntity<>(resp.toString(), HttpStatus.UNAUTHORIZED);
        }
        Cookie cookie = new Cookie("employeeEmail", employee.getEmployeeEmail());
        cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
//        cookie.setSecure(true);
//        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        JSONObject resp = new JSONObject();
        resp.put("role","Employee");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }

    @GetMapping("/signout")
    public ResponseEntity<?> employeeSignOut(HttpServletRequest request, HttpServletResponse response){
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
            JSONObject resp = new JSONObject();
            resp.put("message", "employee sign out done");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        else {
            JSONObject resp = new JSONObject();
            resp.put("message","Error signing out");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
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

    @GetMapping("/tasks/{empID}")
    public List<Task> getTasksOfEmployee(@PathVariable Integer empID){
        return taskService.getTasksByEmpId(empID);
    }

    @GetMapping("/tasks")
    public List<Task> getTasksOfEmployeeByEmail(HttpServletRequest request, HttpServletResponse response){
        Cookie[] cookies = request.getCookies();
        String empEmail = cookies[0].getValue();
        return taskService.getTasksByEmpEmailAndStatus(empEmail, "Pending");
    }


    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Integer id){
        employeeService.removeEmployee(id);
        return "Deleted employee with id "+ id;
    }

}
