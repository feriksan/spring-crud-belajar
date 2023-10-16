package com.example.testcrud.service;

import com.example.testcrud.entity.User;
import com.example.testcrud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User createUser(User user){
        return repository.save(user);
    }

    public List<User> getUsers(){
        return repository.findAll();
    }

    public User getUserById(String username){
        return repository.findById(username).orElse(null);
    }

    public String deleteUser(String username){
        repository.deleteById(username);
        return "user telah dihapus "+ username;
    }

    public User userUpdate(User user){
        User exsistingUser = repository.findByUsername(user.getUsername()).orElse(null);
        exsistingUser.setUsername(user.getUsername());
        return repository.save(exsistingUser);
    }
}
