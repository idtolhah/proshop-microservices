package com.tolhah.payments.models;

// import javax.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter @Setter @NoArgsConstructor
public class ShippingAddress {
    private String name;
    private String phoneNumber;
    private String address;
    private String subdistrict;
    private String city;
    private String province;
    private String postalCode;
}
