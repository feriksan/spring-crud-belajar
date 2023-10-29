package com.example.testcrud.payload;

import com.example.testcrud.entity.FileMetadata;
import lombok.Data;

import java.util.List;

@Data
public class MetadataPayload {
    List<FileMetadata> metadata;
}
