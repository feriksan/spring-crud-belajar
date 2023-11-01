package com.example.testcrud.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

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
    @Column(name = "file_path")
    private String filePath;
    private String owner;
    private String type;
    private Date date_created;
    private Date date_modified;
    private String modified_by;

    @ManyToOne
    @JoinColumn(name = "file_id")
    @JsonIgnore
    private FileEntity file;

    @OneToMany(mappedBy = "fileHistory")
    private List<FileMetadata> fileMetadata;



}
