package com.example.testcrud.repository;

import com.example.testcrud.entity.SubFolderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubFolder extends JpaRepository<SubFolderEntity, Integer> {
    @Query(nativeQuery = true,value = "select * from subfolder where rootFolder=?")
    List<SubFolderEntity> findByRootFolder(int rootFolder);
}
