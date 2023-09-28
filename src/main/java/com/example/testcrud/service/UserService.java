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

    public User getUserById(int id){
        return repository.findById(id).orElse(null);
    }

    public String deleteUser(int id){
        repository.deleteById(id);
        return "user telah dihapus "+ id;
    }

    public User userUpdate(User user){
        User exsistingUser = repository.findById(user.getUserID()).orElse(null);
        exsistingUser.setUsername(user.getUsername());
        return repository.save(exsistingUser);
    }
}
