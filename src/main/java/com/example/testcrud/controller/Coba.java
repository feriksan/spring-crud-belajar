package com.example.testcrud.controller;

import com.example.testcrud.entity.User;
import com.example.testcrud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/coba")
@RequiredArgsConstructor
public class Coba {

    private final UserRepository userRepository;

    @GetMapping("/getUser/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(userRepository.findByUsername(username).orElseThrow());
    }

}
