package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TodoRepository extends JpaRepository<Todo, Integer> {
//    boolean findTodosByDeletedFalse();
//    List<Todo> findAllByTask_TaskIdAndDeletedFalse(Integer taskId);
//    List<Todo> findAllByTask_TaskId(Integer taskId);
    List<Todo> findAllByTask_TaskIdAndIsDeletedFalse(Integer taskId);
}
