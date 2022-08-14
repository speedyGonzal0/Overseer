package com.theGonzalos.Overseer.service;

import com.theGonzalos.Overseer.model.User;
import com.theGonzalos.Overseer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void registerUser(User user){
        userRepository.save(user);
    }

    public User getUser(Integer id){
        return userRepository.findById(id).get();
    }

    public User getUser(String email, String password){
        return userRepository.findByEmailAndPass(email, password);
    }

    public User getUser(String email){
        return userRepository.findByEmail(email);
    }
    public boolean userExists(String email){
        return userRepository.existsUserByEmail(email);
    }

    public void removeUser(Integer id){
        userRepository.deleteById(id);
    }





}
