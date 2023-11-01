package com.example.testcrud.repository;

import com.example.testcrud.mapper.FileWithMetadataRowMapper;
import com.example.testcrud.payload.FileWithMetadataPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FileWithMetadataRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<FileWithMetadataPayload> getAllFilesWithMetada(){
        List<FileWithMetadataPayload> fileList = new ArrayList<>();
        fileList.addAll(jdbcTemplate.query("select files.id, file_history.file_path, file_metadata.metadata_key, file_metadata.metadata_value from ((files inner join file_history on file_history.file_id = files.id) inner join file_metadata on file_metadata.file_id = files.id)", new FileWithMetadataRowMapper()));
        return fileList;
    }
}
