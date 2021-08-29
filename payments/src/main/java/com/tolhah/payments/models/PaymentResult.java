package com.tolhah.payments.models;

// import javax.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter @Setter @NoArgsConstructor
public class PaymentResult {
    private String id;
    private String status;
    private String update_time;
    private String email_address;
}
