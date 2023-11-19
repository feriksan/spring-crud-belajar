package com.example.testcrud.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "subfolder")
public class SubFolderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String subfolderName;
    private int subfolderLevel;
    private String url;

    @JsonIgnore
    public Folder getFolder() {
        return folder;
    }

    @ManyToOne
    @JoinColumn(name = "rootFolder")
    private Folder folder;

}
