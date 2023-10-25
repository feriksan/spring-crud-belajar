package com.example.testcrud.service;

import com.example.testcrud.entity.Roles;
import com.example.testcrud.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
    @Autowired
    RolesRepository rolesRepository;
    
    public Roles createRole(Roles roles){return rolesRepository.save(roles);}
    
    public List<Roles> findAllRole(){return rolesRepository.findAll();}
    
    public List<Roles> findByParentRole(String parentRole){return rolesRepository.findByParentRoleName(parentRole);}
    
    public Roles findByRoleName(String role){return rolesRepository.findById(role).orElse(null);}
    
    public Roles updateRole(Roles roles){
        Roles existingRole = rolesRepository.findById(roles.getRoleName()).orElseThrow(NullPointerException::new);
        existingRole.setDescription(roles.getDescription() != null ? roles.getDescription() : existingRole.getDescription());
        existingRole.setParentRoleName(roles.getParentRoleName() != null ? roles.getParentRoleName() : existingRole.getParentRoleName());
        return rolesRepository.save(existingRole);
    }
    
    public String deleteRole(String roles){
        rolesRepository.deleteById(roles);
        return "Role Berhasil Dihapus";
    }
}
