package com.example.testcrud;

import com.example.testcrud.properties.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class TestcrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestcrudApplication.class, args);
    }
}
