package com.example.movies;

public class PersonalInfo {
    String firstName;
    String lastName;
    String email;
    String password;
    String confirmPassword;
    String cardType;
    String paymentInfo;
    String expirationDate;
    String promotion;
    String address;
    
    PersonalInfo(String firstName,
    String lastName,
    String email,
    String password,
    String confirmPassword,
    String cardType,
    String paymentInfo,
    String expirationDate,
    String promotion,
    String address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.paymentInfo = paymentInfo;
        this.cardType = cardType;
        this.confirmPassword  = confirmPassword;
        this.expirationDate = expirationDate;
        this.promotion = promotion;
        this.address = address;
    }
}
