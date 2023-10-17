package com.example.testcrud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class ActivityLog {
    
    @Id
    @GeneratedValue
    private int id;
    private String username;
    private  String activity;
    private Timestamp ts;
    
}
