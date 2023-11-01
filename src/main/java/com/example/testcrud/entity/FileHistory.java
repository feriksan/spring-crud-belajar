package com.example.testcrud.entity;

import jakarta.persistence.*;
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
@Table(name = "file_history")
public class FileHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "file_id")
    private Integer fileId;
    @Column(name = "file_path")
    private String filePath;
    private String owner;
    private String type;
    private Date date_created;
    private Date date_modified;
    private String modified_by;
}
