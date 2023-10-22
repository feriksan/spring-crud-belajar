package com.example.testcrud.service;

import com.example.testcrud.exception.FileStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Base64;

@Service
public class FileEncrypterService {

    @Autowired
    private FileStorageService fileStorageService;

    public String base64Encoding(MultipartFile file, String subfolder){
        try {
            String fileName;
            byte[] input_file = file.getBytes();
            byte[] encodedBytes = Base64.getEncoder().encode(input_file);
            if(file.getOriginalFilename() != null){
                fileName = StringUtils.cleanPath(file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf(".")));
            }else{
                throw new FileStorageException("Sorry! Filename contains invalid path sequence");
            }
            SecretKey key = generateKey(192);
            IvParameterSpec iv = generateIv();
            String encryptedText = encrypt(encodedBytes, key, iv);
            String decryptedText = decrypt(encryptedText, key, iv);
            fileStorageService.writeFile(encryptedText.getBytes(), "encrypted"+fileName, subfolder);
            fileStorageService.writeFile(decryptedText.getBytes(), "decrypted"+fileName, subfolder);
            fileStorageService.writeFile(encodedBytes, fileName, subfolder);
            return new String(encodedBytes);
        }catch (IOException | NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException |
                IllegalBlockSizeException | BadPaddingException ex){
            throw new FileStorageException("Could not encrypt content ", ex);
        } catch (InvalidAlgorithmParameterException e) {
            throw new RuntimeException(e);
        }
    }

    public SecretKey generateKey(int n){
        try{
            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
            keyGenerator.init(n);
            return keyGenerator.generateKey();
        }catch (NoSuchAlgorithmException ex){
            throw new FileStorageException("Could not generate key ", ex);
        }
    }

    public IvParameterSpec generateIv(){
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        return new IvParameterSpec(iv);
    }

    public String encrypt(byte[] content, SecretKey key, IvParameterSpec iv) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, iv);

        byte[] cipherText = cipher.doFinal(content);
        return Base64.getEncoder().encodeToString(cipherText);
    }

    public String decrypt(String content, SecretKey key, IvParameterSpec iv) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key, iv);
        byte[] plainText = cipher.doFinal(Base64.getDecoder().decode(content));
        return new String(plainText);
    }

    public void base64Decode(String encodedString) throws IOException{
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString.getBytes());
    }

    public void encrypt(String content, String filename){

    }
}
