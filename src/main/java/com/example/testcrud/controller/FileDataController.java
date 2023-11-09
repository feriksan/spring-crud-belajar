package com.example.testcrud.controller;

import com.example.testcrud.entity.FileEntity;
import com.example.testcrud.entity.FileHistory;
import com.example.testcrud.entity.User;
import com.example.testcrud.payload.MetadataPayload;
import com.example.testcrud.payload.UploadFileResponse;
import com.example.testcrud.payload.UrlPayload;
import com.example.testcrud.service.FileDataService;
import com.example.testcrud.service.FileEncrypterService;
import com.example.testcrud.service.FileStorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/filedata")
@RequiredArgsConstructor
public class FileDataController {

    private final FileDataService fileDataService;

    private final FileStorageService fileStorageService;

    private final FileEncrypterService encrypterService;

    private final ObjectMapper objectMapper;

    @GetMapping("/get_file_by_user")
    public ResponseEntity<List<FileEntity>> getfileByUser() throws Exception {
        String username = getUsername();
        if(username==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(fileDataService.getFileByUser(username));
    }

    @GetMapping("/get_file_by_month")
    public ResponseEntity<List<Object>> getFileByUserGroupByMonth() throws Exception{
        String username = getUsername();
        if(username==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(fileDataService.getFileByUserGroupByDate(username));
    }

    @PostMapping("create_new_file")
    public ResponseEntity<String> createNewFile(@RequestParam("file") MultipartFile file, @RequestParam("subfolder") String subfolder, @RequestParam("metadata") String metadataPayload) throws Exception {
        String username = getUsername();
        String userSubfolder = username + "/" + subfolder;
        String encrypt = encrypterService.base64Encoding(file, subfolder);
        String fileName = fileStorageService.storeFile(file, userSubfolder);
        MetadataPayload metadataPayload1 = objectMapper.readValue(metadataPayload, MetadataPayload.class);

        fileDataService.createNewFile(username,fileName,metadataPayload1, subfolder);
        return ResponseEntity.ok("sukses");
    }

    @PutMapping("edit_metadata_file/{file_id}")
    public ResponseEntity<String> editMetadataFile(@PathVariable("file_id") Integer fileId,@RequestBody MetadataPayload payload) throws Exception {
        fileDataService.editMetadata(getUsername(),fileId,payload);
        return ResponseEntity.ok("sukses");
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

    public String getUsername() throws Exception {
        if(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()){
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof User) {
                String username = ((User)principal).getUsername();
                return username;
            }else{
                throw new Exception("principal is not instance of User");
            }
        }
        return null;
    }

}
