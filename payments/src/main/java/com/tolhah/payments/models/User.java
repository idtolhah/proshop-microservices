package com.tolhah.payments.models;

import java.io.Serializable;

// import javax.persistence.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter @Setter @NoArgsConstructor
public class User {
    private String id;
    private String name;
    private String email;
    private String expoPushToken;
}
