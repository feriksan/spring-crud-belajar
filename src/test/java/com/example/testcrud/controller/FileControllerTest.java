package com.example.testcrud.controller;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.InputStream;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@WebMvcTest(controllers = FileController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class FileControllerTest {
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Test
    void uploadFile() throws Exception{
        final InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("test.png");
        final MockMultipartFile file = new MockMultipartFile("file", "test.png", "image/png", inputStream);

        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc.perform(MockMvcRequestBuilders.multipart("/uploadFile/uploadSatu")
                        .file(file)
                        .param("some-random", "4"))
                .andExpect(status().is(200))
                .andExpect(content().string("success"));
    }
}