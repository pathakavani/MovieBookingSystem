package com.example.movies;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
public class PaymentCard{
    @Autowired
    String expirationDate;
    String cardType;
    String cardNumber;
    String billingAddress;
    String userID;
    PaymentCard(String ct, String cn, String ed, String billingAddy, String userID) {
        expirationDate = ed;
        cardType = ct;
        cardNumber = cn;
        billingAddress = billingAddy;
        this.userID = userID;
    }
}
