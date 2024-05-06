package com.example.movies;

import java.io.Serializable;
public class PaymentCard implements Serializable{
    String expirationDate;
    String cardType;
    String cardNumber;
    String billingAddress;
    PaymentCard(String ct, String cn, String ed, String billingAddy) {
        expirationDate = ed;
        cardType = ct;
        cardNumber = cn;
        billingAddress = billingAddy;
    }
}
