package com.example.testcrud.controller;

import com.example.testcrud.entity.User;
import com.example.testcrud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user){
        return new ResponseEntity<>(service.createUser(user), HttpStatus.OK);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(service.getUsers(), HttpStatus.OK);
    }

    @GetMapping("getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable  int id){
        return new ResponseEntity<>(service.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/deletUser/{id}")
    public  ResponseEntity<String> deleteUser(@PathVariable int id){
        return new ResponseEntity<>(service.deleteUser(id), HttpStatus.OK);
    }

    @PutMapping("/updateUser")
    public  ResponseEntity<User> updateUser(@RequestBody User user){
        return new ResponseEntity<>(service.userUpdate(user), HttpStatus.OK);
    }
}
