package com.example.testcrud.service;
import com.example.testcrud.payload.UploadFileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileUploadService {

    @Autowired
    private FileStorageService fileStorageService;

    public UploadFileResponse uploadFile(MultipartFile file, String subfolder){
        String fileName = fileStorageService.storeFile(file, subfolder);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());

    }

//    public List<UploadFileResponse> uploadMultipleFiles(MultipartFile[] files, String subfolder) {
//        return Arrays.stream(files)
//                .map(this::uploadFile)
//                .collect(Collectors.toList());
//    }

}
