package com.theGonzalos.Overseer.controller;

import com.theGonzalos.Overseer.model.User;
import com.theGonzalos.Overseer.model.LoginRequestDTO;
import com.theGonzalos.Overseer.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.NoSuchElementException;



@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> listUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody User user){

        if(userService.userExists(user.getEmail())){
            JSONObject resp = new JSONObject();
            resp.put("message","User already exists");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        user.setRole("Client");
        userService.registerUser(user);
        JSONObject resp = new JSONObject();
        resp.put("message","User registration successful");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> saveAdmin(@RequestBody User user){

        if(userService.userExists(user.getEmail())){
            JSONObject resp = new JSONObject();
            resp.put("message","Admin already exists");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        user.setRole("Admin");
        userService.registerUser(user);
        JSONObject resp = new JSONObject();
        resp.put("message","Admin registration successful");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }



    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id){
        try {
            User user = userService.getUser(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping( value = "/signin", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> processLogin(@RequestBody LoginRequestDTO loginRequest, HttpServletResponse response){

        User user = userService.getUser(loginRequest.getEmail(), loginRequest.getPassword());

        if(user != null) {
            Cookie cookie = new Cookie("userEmail", user.getEmail());
            cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
//            cookie.setSecure(true);
//            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            JSONObject resp = new JSONObject();
            resp.put("message","User login successful");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }else {
            JSONObject resp = new JSONObject();
            resp.put("message","email or password do not match");
            return new ResponseEntity<>(resp.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/signout")
    public ResponseEntity<?> processSignOut(HttpServletRequest request, HttpServletResponse response){

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
            JSONObject resp = new JSONObject();
            resp.put("message", "User sign out done");
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        else {
            JSONObject resp = new JSONObject();
            resp.put("message","Error in user sign out");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/role")
    public ResponseEntity<?> getUserRole(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse response){
        try {
            User user = userService.getUser(loginRequestDTO.getEmail());
            JSONObject resp = new JSONObject();
            resp.put("Role", user.getRole());
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        }
        catch (Exception e){
            JSONObject resp = new JSONObject();
            resp.put("message", "User does not exist");
            return new ResponseEntity<>(resp.toString(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Integer id){
        try {
            User existingUser = userService.getUser(id);
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPass(user.getPass());
            userService.registerUser(existingUser);
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id){
        userService.removeUser(id);
        return "Deleted user with id "+ id;
    }

}
