package com.example.testcrud.controller;

import com.example.testcrud.entity.Roles;
import com.example.testcrud.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("roles")
public class RolesController {
    @Autowired
    RolesService service;
    
    @PostMapping("/create")
    public ResponseEntity<Roles> createRoles(@RequestBody Roles roles){
        return new ResponseEntity<>(service.createRole(roles), HttpStatus.OK);
    }
    
    @GetMapping("/findAll")
    public ResponseEntity<List<Roles>> getRoles(){
        return new ResponseEntity<>(service.findAllRole(), HttpStatus.OK);
    }
    
    @GetMapping("findById/{id}")
    public ResponseEntity<Roles> getRolesById(@PathVariable  String id){
        return new ResponseEntity<>(service.findByRoleName(id), HttpStatus.OK);
    }
    
    @GetMapping("findByParent/{id}")
    public ResponseEntity<List<Roles>> getRolesByParent(@PathVariable  String id){
        return new ResponseEntity<>(service.findByParentRole(id), HttpStatus.OK);
    }
    
    @PutMapping("/deletRoles/{id}")
    public  ResponseEntity<String> deleteRoles(@PathVariable String id){
        return new ResponseEntity<>(service.deleteRole(id), HttpStatus.OK);
    }
    
    @PutMapping("/updateRoles")
    public  ResponseEntity<Roles> updateUser(@RequestBody Roles roles){
        return new ResponseEntity<>(service.updateRole(roles), HttpStatus.OK);
    }
    
}
