package com.example.testcrud.service;

import com.example.testcrud.entity.MetadataMaster;
import com.example.testcrud.repository.MetadataMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetadataMasterService {
    
    @Autowired
    MetadataMasterRepository metadataMasterRepository;
    
    public List<MetadataMaster> getMetadata(){return metadataMasterRepository.findAll();}
    
    public MetadataMaster getMetadataById(String key){return metadataMasterRepository.findById(key).orElse(null);}
    
    public MetadataMaster createMetadata(MetadataMaster metadataMaster){return metadataMasterRepository.save(metadataMaster);}
    
    public String deleteMetadata(String key){
        metadataMasterRepository.deleteById(key);
        return "Metadata Sudah Dihapus";
    }
    
    public MetadataMaster updateMetadata(MetadataMaster metadataMaster){
        MetadataMaster existingMetadata =  metadataMasterRepository.findById(metadataMaster.getMetadata_key()).orElse(null);
        existingMetadata.setDescription(metadataMaster.getDescription());
        return metadataMasterRepository.save(existingMetadata);
    }
}
