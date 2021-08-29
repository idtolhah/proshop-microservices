package com.tolhah.payments.models;

import java.math.BigDecimal;
// import javax.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter @Setter @NoArgsConstructor
public class OrderItem {
    private String name;
    private Integer qty;
    private String image;
    private BigDecimal price;
    private String product;
}
