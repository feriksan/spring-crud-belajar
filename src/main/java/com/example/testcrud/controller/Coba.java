package com.example.testcrud.controller;

import com.example.testcrud.entity.User;
import com.example.testcrud.payload.UrlPayload;
import com.example.testcrud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/getListFile")
    public ResponseEntity<Object> getListFileInFolder(@RequestBody UrlPayload url) {
        final File foldersNew = new File(url.getUrlNew());
        final File foldersOnGoing = new File(url.getUrlOnGoing());
        final File foldersDone = new File(url.getUrlDone());

        List<String> listFile = new ArrayList<>();
        List<String> listFileOngoing = new ArrayList<>();
        List<String> listFileDone = new ArrayList<>();

        listFilesForFolder(foldersNew, listFile);
        listFilesForFolder(foldersOnGoing, listFileOngoing);
        listFilesForFolder(foldersDone, listFileDone);

        Map<String, Object> data = new HashMap<>();
        data.put("Total Project Count", listFile.size());
        data.put("On Going Count", listFileOngoing.size());
        data.put("Done Count", listFileDone.size());
//        data.put("All Data", listFile);
//        data.put("On Going Data", listFileOngoing);
//        data.put("Done Data", listFileDone);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    public void listFilesForFolder(final File folder, List<String> listAppend) {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry, listAppend);
            } else {
                listAppend.add(fileEntry.getName());
            }
        }
    }
}
