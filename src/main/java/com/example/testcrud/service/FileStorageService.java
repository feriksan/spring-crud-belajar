package com.example.testcrud.service;

import com.example.testcrud.exception.FileNotFoundException;
import com.example.testcrud.exception.FileStorageException;
import com.example.testcrud.properties.FileStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private final Path fileUpload;
    private final Path fileEncrypt;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties){
        Path fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        this.fileUpload = Paths.get(fileStorageProperties.getUploadDir());
        this.fileEncrypt = Paths.get(fileStorageProperties.getEncryptedDocDir());
        try{
            Files.createDirectories(fileStorageLocation);
            Files.createDirectories(this.fileUpload);
            Files.createDirectories(this.fileEncrypt);
        }catch (Exception ex){
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public void writeFile(byte[] content, String filename){
        try{
            Path targetLocation = fileEncrypt.resolve(filename+".bin");
            Files.write(targetLocation, content);
        }catch (IOException ex){
            throw new FileStorageException("Could not store file " + filename + ". Please try again!", ex);
        }
    }

    public String storeFile(MultipartFile file){
        String fileName;
        if(file.getOriginalFilename() != null){
            fileName = StringUtils.cleanPath(file.getOriginalFilename());
        }else{
            throw new FileStorageException("Sorry! Filename contains invalid path sequence");
        }
        try{
            if(fileName.contains("..")){
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation = fileUpload.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        }catch (IOException ex){
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName){
        try{
            Path filePath = this.fileUpload.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }

    }
}
