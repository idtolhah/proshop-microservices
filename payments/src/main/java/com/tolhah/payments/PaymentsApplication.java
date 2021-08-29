package com.tolhah.payments;

import com.tolhah.payments.models.Order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentsApplication.class, args);
		Order order = new Order();
		order.setStatus("UNPAID");
		System.out.println("Status is " + order.getStatus());
	}

}
