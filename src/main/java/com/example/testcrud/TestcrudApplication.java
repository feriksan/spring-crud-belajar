package com.example.testcrud;

import com.example.testcrud.properties.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class TestcrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestcrudApplication.class, args);
    }

}
