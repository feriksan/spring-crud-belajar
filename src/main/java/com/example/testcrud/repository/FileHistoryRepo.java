package com.example.testcrud.repository;

import com.example.testcrud.entity.FileHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileHistoryRepo extends JpaRepository<FileHistory,Integer> {
    Optional<FileHistory> findFirstByFileIdOrderByIdDesc(Integer fileId);
}
