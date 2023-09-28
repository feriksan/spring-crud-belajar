package com.example.testcrud.controller;

import com.example.testcrud.entity.User;
import com.example.testcrud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/createUser")
    public  User createUser(@RequestBody User user){
        System.out.println(user);
        return service.createUser(user);
    }

    @GetMapping("/getUsers")
    public List<User> getUsers(){
        return service.getUsers();
    }

    @GetMapping("getUserById/{id}")
    public User getUserById(@PathVariable  int id){
        return service.getUserById(id);
    }

    @PutMapping("/deletUser/{id}")
    public  String deleteUser(@PathVariable int id){
        return  service.deleteUser(id);
    }

    @PutMapping("/updateUser")
    public  User updateUser(@RequestBody User user){
        System.out.println(user.getUsername());
        return service.userUpdate(user);
    }
}
