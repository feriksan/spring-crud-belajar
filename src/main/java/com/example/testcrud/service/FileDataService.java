package com.example.testcrud.service;


import com.example.testcrud.entity.*;
import com.example.testcrud.payload.MetadataPayload;
import com.example.testcrud.repository.FileFolderRepo;
import com.example.testcrud.repository.FileHistoryRepo;
import com.example.testcrud.repository.FileRepository;
import com.example.testcrud.repository.MetadataRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FileDataService {
    private final FileRepository fileRepository;
    private final FileHistoryRepo fileHistoryRepo;
    private final MetadataRepository metadataRepository;
    private final FileFolderRepo fileFolderRepo;

    @Autowired
    FileStorageService fileStorageService;

    public List<FileEntity> getFileByUser(String username){
        return fileRepository.findByCreated(username);
    }
    public List<FileEntity> getFileByUserandLevel(String username, int level){
        return fileRepository.findByCreatedAndLevel(username, level);
    }
    public List<FileEntity> getFileByUserAndLevel(String username, int level, int parent){
        return fileRepository.findByCreatedAndLevel(username, level);
    }

    public void documenTreeInsert(Folder createdFolder){
        FileFolder fileFolder = new FileFolder();
        fileFolder.setParent(createdFolder.getId());
        fileFolder.setFolder(createdFolder.getId());
        fileFolder.setFile(null);
        fileFolder.setDepth(0);
        FileFolder createdTree = fileFolderRepo.save(fileFolder);

    }

    public List<Object> getFileByUserGroupByDate(String username){
        List<Object> allFiles = new ArrayList<>();
        List<FileEntity> files = fileRepository.findByCreated(username);
        List<Object> listFilePerDate = new ArrayList<>();
        int month = 1;
        for(FileEntity file:files){
            Date date = new Date(file.getDate_created().getTime());
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            System.out.println(cal.get(Calendar.MONTH));
            if(cal.get(Calendar.MONTH) == month){
                listFilePerDate.add(file);
            }else{
                Map<String, Object> data = new HashMap<>();
                data.put("Owner", file.getCreated_by());
                data.put("Files", listFilePerDate);
                data.put("Date", file.getDate_created());

                month = cal.get(Calendar.MONTH);
            }
        }
        return listFilePerDate;
    }

    @Transactional
    public FileEntity createNewFile(String username, String fileName, MetadataPayload metadataPayload, String subfolder, int fileSize, String fileSizeUnit) {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(null);
        fileEntity.setSubfolder(subfolder);
        fileEntity.setFileSize(fileSize);
        fileEntity.setFileSizeUnit(fileSizeUnit);
        fileEntity.setLevel(1);
        fileEntity.setDate_created(Timestamp.valueOf(LocalDateTime.now()));
        fileEntity.setDate_modified(Timestamp.valueOf(LocalDateTime.now()));
        fileEntity.setCreated_by(username);

        FileEntity fileEntity1 = fileRepository.saveAndFlush(fileEntity);

        FileHistory fileHistory = new FileHistory();
        fileHistory.setFile(fileEntity1);
        fileHistory.setDate_created(fileEntity1.getDate_created());
        fileHistory.setId(null);
        fileHistory.setType("CREATE");
        fileHistory.setModified_by(username);
        fileHistory.setFilePath(fileName);
        fileHistory.setOwner(username);
        fileHistory.setDate_modified(fileEntity1.getDate_created());
        FileHistory fileHistory1 = fileHistoryRepo.saveAndFlush(fileHistory);

        List<FileMetadata> metadata = metadataPayload.getMetadata();
        for (FileMetadata metadatum : metadata) {
            metadatum.setFileHistory(fileHistory1);
        }
        FileEntity newlyAddFile = fileRepository.findById(fileEntity1.getId()).orElseThrow(null);
        metadataRepository.saveAll(metadata);
        return newlyAddFile;
    }

    public void createNewDirectory(String username, String fileName, MetadataPayload metadataPayload, String subfolder, int fileSize, String fileSizeUnit){
        Folder newFolder = new Folder();

//        FileHistory fileHistory = new FileHistory();
//        fileHistory.setFile();
//        fileHistory.setDate_created(fileEntity1.getDate_created());
//        fileHistory.setId(null);
//        fileHistory.setType("CREATE");
//        fileHistory.setModified_by(username);
//        fileHistory.setFilePath(subfolder);
//        fileHistory.setOwner(username);
//        fileHistory.setDate_modified(fileEntity1.getDate_created());
//        FileHistory fileHistory1 = fileHistoryRepo.saveAndFlush(fileHistory);
    }

    public void deleteFile(String filename, String subfolder, Integer fileId) throws IOException {
        fileRepository.deleteById(fileId);
        fileStorageService.deleteFileAsResource(filename, subfolder);
    }

    public void editMetadata(String username,Integer fileId, MetadataPayload payload) {
        FileHistory fileHistory = fileHistoryRepo.findFirstByFileIdOrderByIdDesc(fileId).orElseThrow();
        //duplicate fileHistory

        FileHistory baru = new FileHistory();
        baru.setId(null);
        baru.setFile(new FileEntity(fileId));
        baru.setOwner(fileHistory.getOwner());
        baru.setModified_by(username);
        baru.setFilePath(fileHistory.getFilePath());
        baru.setType(fileHistory.getType());
        baru.setDate_modified(Timestamp.valueOf(LocalDateTime.now()));
        baru.setDate_created(fileHistory.getDate_created());

        FileHistory fileHistory1 = fileHistoryRepo.saveAndFlush(baru);

        //buat metadata yang baru
        List<FileMetadata> metadata = payload.getMetadata();
        for (FileMetadata metadatum : metadata) {
            metadatum.setFileHistory(fileHistory1);
        }
        metadataRepository.saveAll(metadata);
    }
}
