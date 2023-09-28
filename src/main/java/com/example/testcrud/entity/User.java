package com.example.testcrud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "user", schema = "testspring")
public class User {

    @Id
    @GeneratedValue
    private int UserID;
    private String Username;
    private String Password;
}
