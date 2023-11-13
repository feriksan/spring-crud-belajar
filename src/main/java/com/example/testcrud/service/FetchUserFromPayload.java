package com.example.testcrud.service;

import com.example.testcrud.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class FetchUserFromPayload {
    public User getUser() throws Exception {
        if(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()){
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof User) {
                return ((User)principal);
            }else{
                throw new Exception("principal is not instance of User");
            }
        }
        return null;
    }
}
