package com.example.testcrud.repository;

import com.example.testcrud.entity.MetadataMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MetadataMasterRepository extends JpaRepository<MetadataMaster, String> {
}
