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
public class File {
    
    @Id
    @GeneratedValue
    private int id;
    private String created_by;
    private Timestamp date_created;
    private Timestamp date_modified;
}
