package com.example.movies;

import java.io.Serializable;
public class PaymentCard implements Serializable{
    String expirationDate;
    String cardType;
    String cardNumber;
    PaymentCard(String ct, String cn, String ed) {
        expirationDate = ed;
        cardType = ct;
        cardNumber = cn;
    }
}
