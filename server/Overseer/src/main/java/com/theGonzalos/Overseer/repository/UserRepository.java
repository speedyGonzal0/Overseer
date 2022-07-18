package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
