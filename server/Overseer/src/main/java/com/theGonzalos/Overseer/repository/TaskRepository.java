package com.theGonzalos.Overseer.repository;

import com.theGonzalos.Overseer.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findAllByOrder_ReqIdAndIsDeletedFalse(int reqId);
    List<Task> findAllByEmployee_EmployeeId(int empId);
}
