package com.example.testcrud.mapper;

import com.example.testcrud.payload.FileWithMetadataPayload;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FileWithMetadataRowMapper implements RowMapper<FileWithMetadataPayload> {
    @Override
    public FileWithMetadataPayload mapRow(ResultSet rs, int rowNum) throws SQLException {
        FileWithMetadataPayload files = new FileWithMetadataPayload();
        files.setId(rs.getInt("id"));
        files.setFile_path(rs.getString("file_path"));
        files.setMetadata_key(rs.getString("metadata_key"));
        files.setMetadata_value(rs.getString("metadata_value"));
        return files;
    }
}
