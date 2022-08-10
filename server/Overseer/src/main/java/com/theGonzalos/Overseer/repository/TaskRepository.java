package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
