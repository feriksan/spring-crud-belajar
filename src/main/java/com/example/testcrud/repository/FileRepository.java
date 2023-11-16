package com.example.testcrud.repository;

import com.example.testcrud.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity,Integer> {
    @Query(nativeQuery = true,value = "select * from files where created_by=?")
    List<FileEntity> findByCreated(String createdBy);

    @Query(nativeQuery = true,value = "select * from files where created_by=? and parent=?")
    List<FileEntity> findByCreatedAndFolder(String createdBy, int parent);

    @Query(nativeQuery = true,value = "select * from files where created_by=? and level=?")
    List<FileEntity> findByCreatedAndLevel(String createdBy, int level);
}
