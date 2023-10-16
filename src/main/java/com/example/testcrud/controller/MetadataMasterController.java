package com.example.testcrud.controller;

import com.example.testcrud.entity.MetadataMaster;
import com.example.testcrud.service.MetadataMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("metadataMaster")
public class MetadataMasterController {
    
    @Autowired
    private MetadataMasterService metadataMasterService;
    
    @PostMapping("/create")
    public ResponseEntity<MetadataMaster> createMetadata(@RequestBody MetadataMaster metadataMaster){
        return new ResponseEntity<>(metadataMasterService.createMetadata(metadataMaster), HttpStatus.OK);
    }
    
    @GetMapping("/findAll")
    public ResponseEntity<List<MetadataMaster>> getAllMetadata(){
        return new ResponseEntity<>(metadataMasterService.getMetadata(), HttpStatus.OK);
    }
}
