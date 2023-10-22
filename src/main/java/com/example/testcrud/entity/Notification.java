package com.example.testcrud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Notification {
    
    @Id
    @GeneratedValue
    private int id;
    private String sender;
    private String receiver;
    private int file_id;
    private String message;
}
