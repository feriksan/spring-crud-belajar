package com.example.testcrud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FileHistory {
    
    @Id
    @GeneratedValue
    private int id;
    private int file_id;
    private String file_path;
    private String owner;
    private String type;
    private Date date_created;
    private Date date_modified;
    private String modified_by;
}
