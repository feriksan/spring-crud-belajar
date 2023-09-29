package com.example.testcrud.payload;

import lombok.Data;

@Data
public class UploadFileResponse {

    private String filename;
    private String fileDownloadUri;
    private String fileType;
    private long size;

    public UploadFileResponse(String filename, String fileDownloadUri, String fileType, long size) {
        this.filename = filename;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }
}
