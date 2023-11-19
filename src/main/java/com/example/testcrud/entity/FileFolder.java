package com.example.testcrud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "folder_tree")
public class FileFolder {
    @Id
    private Integer parent;
    private Integer folder;
    private Integer file;
    private Integer depth;
}
