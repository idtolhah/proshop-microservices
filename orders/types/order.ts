import { OrderStatus } from '@ta-shop-simple/common';

export type Order = {
    id: string;
    userId: string;
    sellerId: string;
    orderItems: [
      {
        qty: number,
        price: number,
        productId: string,
      },
    ];
    shippingAddressId: string;
    paymentMethod: string;
    paymentResult: {
      id: string,
      status: string,
      update_time: string,
      email_address: string,
    };
    
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    
    isPaid: boolean;
    isDelivered: boolean;
  
    paidAt: Date;
    deliveredAt: Date;
    processedAt: Date;
    cancelledAt: Date;
    shippedAt: Date;
    receivedAt: Date;
    returnedAt: Date;
    completedAt: Date;
    expiresAt: number;
  
    receiptNumber: string;
    cancelReason: string;
    returnReason: string;
    
    status: OrderStatus;
  };