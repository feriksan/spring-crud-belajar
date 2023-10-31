package com.example.testcrud.controller;

import com.example.testcrud.entity.User;
import com.example.testcrud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coba")
@RequiredArgsConstructor
public class Coba {

    private final UserRepository userRepository;

    @GetMapping("/getUser/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(userRepository.findByUsername(username).orElseThrow());
    }
    
    @GetMapping("/getFileList/{url}")
    public ResponseEntity<Object> getFileListFromFolder(@PathVariable("url") String url){
        final File folder = new File(url);
        List<String> files = new ArrayList<>();
        listFilesForFolder(folder, files);
        Map<String , Object> data = new HashMap<>();
        data.put("fileCount", files.size());
        data.put("file", files);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    
    public List<String> listFilesForFolder(final File folder, List<String> storeFile) {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry, storeFile);
            } else {
                storeFile.add(fileEntry.getName());
            }
        }
        return storeFile;
    }

}
