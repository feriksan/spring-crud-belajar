package com.example.testcrud.controller;

import com.example.testcrud.entity.*;
import com.example.testcrud.payload.MetadataPayload;
import com.example.testcrud.payload.UrlPayload;
import com.example.testcrud.repository.FolderRepo;
import com.example.testcrud.repository.SubFolderRepo;
import com.example.testcrud.service.FetchUserFromPayload;
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

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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

    @Autowired
    private FolderRepo folderRepo;

    @Autowired
    private SubFolderRepo subFolderRepo;

    @Autowired
    private FetchUserFromPayload fetchUserFromPayload;

    @GetMapping("/get_file_by_user")
    public ResponseEntity<List<FileEntity>> getfileByUser() throws Exception {
        String username = getUser().getUsername();
        if(username==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(fileDataService.getFileByUser(username));
    }

    @GetMapping("/get_file_by_month")
    public ResponseEntity<List<Object>> getFileByUserGroupByMonth() throws Exception{
        String username = getUser().getUsername();
        if(username==null){
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(fileDataService.getFileByUserGroupByDate(username));
    }

    @PostMapping("create_new_file")
    public ResponseEntity<FileEntity> createNewFile(@RequestParam("file") MultipartFile file, @RequestParam("subfolder") String subfolder, @RequestParam("metadata") String metadataPayload, @RequestParam("fileSize") int fileSize, @RequestParam("fileSizeUnit") String fileSizeUnit) throws Exception {
        String username = getUser().getUsername();
        String role = getUser().getRole();
        String userSubfolder = role + "/" + username + "/" + subfolder;
        String encrypt = encrypterService.base64Encoding(file, subfolder);
        String fileName = fileStorageService.storeFile(file, userSubfolder);
        MetadataPayload metadataPayload1 = objectMapper.readValue(metadataPayload, MetadataPayload.class);

        FileEntity fileCreated = fileDataService.createNewFile(username,fileName,metadataPayload1, userSubfolder, fileSize, fileSizeUnit);
        return ResponseEntity.ok(fileCreated);
    }

    @PostMapping("create_new_dir")
    public ResponseEntity<Folder> createNewDir(@RequestBody Folder folder) throws Exception {
        String username = getUser().getUsername();
        String role = getUser().getRole();
        folder.setOwner(username);
        folder.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        String userSubfolder = role + "/" + username + "/" + folder.getFolder();
        folder.setUrl(userSubfolder);
        Folder createdFolder = folderRepo.save(folder);
        fileStorageService.createSubfolder(userSubfolder);
        if(folder.getParent() != 0){
            fileDataService.documenTreeInsert(createdFolder);
        }
//        fileDataService.documenTreeInsert(folder.getId(), folder.getId(), 2);
        return new ResponseEntity<>(createdFolder, HttpStatus.CREATED);
    }

    @PostMapping("create_sub_dir")
    public ResponseEntity<String> createSubDir(@RequestBody SubFolderEntity subFolder) throws Exception {
        String folderUrl = folderRepo.findById(subFolder.getFolder().getId()).orElseThrow(null).getUrl();
        subFolder.setFolder(folderRepo.findById(subFolder.getFolder().getId()).orElseThrow(null));
        subFolder.setUrl(folderUrl + "/" + subFolder.getSubfolderName());
        subFolderRepo.save(subFolder);
        String userSubfolder = folderUrl + "/" + subFolder.getSubfolderName();
        fileStorageService.createSubfolder(userSubfolder);
        return new ResponseEntity<>("Berhasil", HttpStatus.CREATED);
    }

    @GetMapping("get_folder_structure/{rootFolder:.+}")
    public ResponseEntity<List<SubFolderEntity>> getFolderStructure(@PathVariable int rootFolder){
        return new ResponseEntity<>(subFolderRepo.findByRootFolder(rootFolder), HttpStatus.OK);
    }

    @GetMapping("get_root_folder")
    public ResponseEntity<List<Folder>> getRootFolder() throws Exception {
        return new ResponseEntity<>(folderRepo.findByOwner(getUser().getUsername()), HttpStatus.OK);
    }

    @GetMapping("get_file_and_folder/{level:.+}")
    public ResponseEntity<Map<String, Object>> getFileAndFolder(@PathVariable int level) throws Exception {
        Map<String, Object> fileFolder = new HashMap<>();
        List<FileEntity> getFile = fileDataService.getFileByUserandLevel(getUser().getUsername(), level);
        if(level > 1){
            List<SubFolderEntity> getFolder = subFolderRepo.findByLevelFolder(level);
            fileFolder.put("Folder", getFolder);
        }else{
            List<Folder> getFolder = folderRepo.findByOwner(getUser().getUsername());
            fileFolder.put("Folder", getFolder);
        }
        fileFolder.put("File", getFile);
        return new ResponseEntity<>(fileFolder, HttpStatus.OK);
    }

    @DeleteMapping("/deleteFile/{subfolder:.+}/{fileName:.+}/{fileId:.+}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName, @PathVariable String subfolder, @PathVariable Integer fileId) throws Exception {
        try{
            fileDataService.deleteFile(fileName, fetchUserFromPayload.getUser().getRole() + "/" + fetchUserFromPayload.getUser().getUsername() + "/" + subfolder, fileId);
        }catch (IOException er){
            return new ResponseEntity<>(er.getMessage().toString(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>("Berhasil", HttpStatus.OK);
    }

    @PutMapping("edit_metadata_file/{file_id}")
    public ResponseEntity<String> editMetadataFile(@PathVariable("file_id") Integer fileId,@RequestBody MetadataPayload payload) throws Exception {
        fileDataService.editMetadata(getUser().getUsername(),fileId,payload);
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

    public User getUser() throws Exception {
        if(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()){
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof User) {
//                String username = ((User)principal).getUsername();
                return ((User)principal);
            }else{
                throw new Exception("principal is not instance of User");
            }
        }
        return null;
    }

}
