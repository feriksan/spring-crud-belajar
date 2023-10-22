package com.example.testcrud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "roles")
public class Roles {
    
    @Id
    @Column(name = "role_name")
    private String roleName;
    private String description;
    @Column(name = "parent_role_name")
    private String parentRoleName;
}
