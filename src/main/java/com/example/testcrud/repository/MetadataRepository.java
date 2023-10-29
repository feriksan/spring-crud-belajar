package com.example.testcrud.repository;

import com.example.testcrud.entity.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetadataRepository extends JpaRepository<FileMetadata,Integer> {
}
