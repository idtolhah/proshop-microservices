package com.tolhah.payments.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
// import javax.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity
@Getter @Setter @NoArgsConstructor
public class Order {
    private User user;
    private Seller seller;
    private List<OrderItem> orderItems;
    private ShippingAddress shippingAddress;
    private PaymentResult paymentResult;
    private String paymentMethod;
    private BigDecimal taxPrice;
    private BigDecimal shippingPrice;
    private BigDecimal totalPrice;
    private boolean isPaid;
    private boolean isDelivered;

    private LocalDate paidAt;
    private LocalDate deliveredAt;
    private LocalDate processedAt;
    private LocalDate cancelledAt;
    private LocalDate shippedAt;
    private LocalDate receivedAt;
    private LocalDate returnedAt;
    private LocalDate completedAt;
    private Integer expiresAt;

    private String receiptNumber;
    private String cancelReason;
    private String returnReason;
    private String status;
}
