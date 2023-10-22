package com.example.testcrud.helper;

public class FindByNullChecker {
    public String check(String newString, String oldString){
        String finalString = newString != null ? newString : oldString;
        return finalString;
    }
}
