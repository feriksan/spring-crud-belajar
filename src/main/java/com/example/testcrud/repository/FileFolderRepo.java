package com.example.testcrud.repository;

import com.example.testcrud.entity.FileFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileFolderRepo extends JpaRepository<FileFolder, Integer> {
}
