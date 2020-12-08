import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    orderItems: [{
      name: string;
      qty: number;
      image: string;
      price: number;
      product: string;
    }];
    user: {
      _id: string;
      name: string;
      email: string;
    };
    shippingAddress: {
      name: string;
      phoneNumber: string;
      address: string;
      subdistrict: string;
      city: string;
      province: string;
      postalCode: string;
    };
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    status: OrderStatus;
    expiresAt: Date;
  };
}
