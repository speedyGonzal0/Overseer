package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAndPass(String email, String pass);
    User findByEmail(String email);
    Boolean existsUserByEmail(String email);
}
