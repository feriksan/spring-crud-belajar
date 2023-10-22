package com.example.testcrud.repository;

import com.example.testcrud.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolesRepository extends JpaRepository<Roles, String> {
    List<Roles> findByParentRoleName(String parentRole);
}
