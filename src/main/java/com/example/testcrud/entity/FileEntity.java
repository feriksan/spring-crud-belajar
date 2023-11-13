package com.example.testcrud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "files")
public class FileEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String created_by;
    private int fileSize;
    private String fileSizeUnit;
    private String subfolder;
    private int level;
    private Timestamp date_created;
    private Timestamp date_modified;

    @OneToMany(
            mappedBy = "file",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<FileHistory> fileHistories;

    public FileEntity(Integer fileId){
        this.id = fileId;
    }

}
