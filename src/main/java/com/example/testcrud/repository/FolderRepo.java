package com.example.testcrud.repository;

import com.example.testcrud.entity.FileEntity;
import com.example.testcrud.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FolderRepo extends JpaRepository<Folder, Integer> {
    @Query(nativeQuery = true,value = "select * from folder where owner=?")
    List<Folder> findByOwner(String owner);

    Optional<Folder> findByFolder(String folder);
}
