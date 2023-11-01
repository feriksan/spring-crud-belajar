package com.example.testcrud.service;


import com.example.testcrud.entity.FileEntity;
import com.example.testcrud.entity.FileHistory;
import com.example.testcrud.entity.FileMetadata;
import com.example.testcrud.payload.FileWithMetadataPayload;
import com.example.testcrud.payload.MetadataPayload;
import com.example.testcrud.repository.FileHistoryRepo;
import com.example.testcrud.repository.FileRepository;
import com.example.testcrud.repository.FileWithMetadataRepository;
import com.example.testcrud.repository.MetadataRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileDataService {
    private final FileRepository fileRepository;
    private final FileHistoryRepo fileHistoryRepo;
    private final MetadataRepository metadataRepository;
    private final FileWithMetadataRepository fileWithMetadataRepository;

    public List<FileEntity> getFileByUser(String username){

        //TODO : database masih kosong, ini sementara dummy buat testing di UI

        //return fileRepository.findByCreated_by(username);
        List<FileWithMetadataPayload> filesMetadata = fileWithMetadataRepository.getAllFilesWithMetada();
        List<FileEntity> ret = new ArrayList<>();
        for(int i=0;i<5;i++){
            FileEntity file = new FileEntity();
            file.setId(i);
            file.setDate_created(Timestamp.valueOf(LocalDateTime.now()));
            file.setDate_modified(Timestamp.valueOf(LocalDateTime.now()));
            file.setCreated_by("wahyu");
            ret.add(file);
        }
        return ret;
    }

    @Transactional
    public void createNewFile(String username, String fileName, MetadataPayload metadataPayload) {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(null);
        fileEntity.setDate_created(Timestamp.valueOf(LocalDateTime.now()));
        fileEntity.setDate_modified(Timestamp.valueOf(LocalDateTime.now()));
        fileEntity.setCreated_by(username);

        FileEntity fileEntity1 = fileRepository.saveAndFlush(fileEntity);

        FileHistory fileHistory = new FileHistory();
        fileHistory.setFileId(fileEntity1.getId());
        fileHistory.setDate_created(fileEntity1.getDate_created());
        fileHistory.setId(null);
        fileHistory.setType("file");
        fileHistory.setModified_by(username);
        fileHistory.setFilePath(fileName);
        fileHistory.setOwner(username);
        fileHistory.setDate_modified(fileEntity1.getDate_created());
        FileHistory fileHistory1 = fileHistoryRepo.saveAndFlush(fileHistory);

        List<FileMetadata> metadata = metadataPayload.getMetadata();
        for (FileMetadata metadatum : metadata) {
            metadatum.setFile_id(fileHistory1.getId());
        }
        metadataRepository.saveAll(metadata);
    }

    public void editMetadata(String username,Integer fileId, MetadataPayload payload) {
        FileHistory fileHistory = fileHistoryRepo.findFirstByFileIdOrderByIdDesc(fileId).orElseThrow();
        //duplicate fileHistory

        FileHistory baru = new FileHistory();
        baru.setId(null);
        baru.setFileId(fileId);
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
            metadatum.setFile_id(fileHistory1.getId());
        }
        metadataRepository.saveAll(metadata);

    }
}
