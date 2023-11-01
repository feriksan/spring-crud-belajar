package com.example.testcrud.payload;

import lombok.Data;

@Data
public class FileWithMetadataPayload {
    private int id;
    private String file_path;
    private String metadata_key;
    private String metadata_value;
}
