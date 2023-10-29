package com.example.testcrud.controller;

import com.example.testcrud.entity.FileEntity;
import com.example.testcrud.entity.FileHistory;
import com.example.testcrud.entity.User;
import com.example.testcrud.payload.MetadataPayload;
import com.example.testcrud.payload.UploadFileResponse;
import com.example.testcrud.service.FileDataService;
import com.example.testcrud.service.FileEncrypterService;
import com.example.testcrud.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/v1/filedata")
@RequiredArgsConstructor
public class FileDataController {

    private final FileDataService fileDataService;

    private final FileStorageService fileStorageService;

    private final FileEncrypterService encrypterService;
    @GetMapping("/get_file_by_user")
    public ResponseEntity<List<FileEntity>> getfileByUser() throws Exception {
        String username = getUsername();
        if(username==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(fileDataService.getFileByUser(username));
    }

    @PostMapping("create_new_file")
    public ResponseEntity<String> createNewFile(@RequestParam("file") MultipartFile file,@RequestParam("subfolder") String subfolder, @RequestBody MetadataPayload metadataPayload) throws Exception {
        String encrypt = encrypterService.base64Encoding(file, subfolder);
        String fileName = fileStorageService.storeFile(file, subfolder);
        String username = getUsername();
        fileDataService.createNewFile(username,fileName,metadataPayload);
        return ResponseEntity.ok("sukses");
    }

    @PutMapping("edit_metadata_file/{file_id}")
    public ResponseEntity<String> editMetadataFile(@PathVariable("file_id") Integer fileId,@RequestBody MetadataPayload payload) throws Exception {
        fileDataService.editMetadata(getUsername(),fileId,payload);
        return ResponseEntity.ok("sukses");
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
