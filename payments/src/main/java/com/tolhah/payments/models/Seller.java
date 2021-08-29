package com.tolhah.payments.models;

// import javax.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter @Setter @NoArgsConstructor
public class Seller {
    private String id;
    private String storeName;
    private String phoneNumber;
    private String address;
    private String subdistrict;
    private String city;
    private String province;
    private String postalCode;
    private String expoPushToken;
}
