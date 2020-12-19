import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderProcessedEvent {
  subject: Subjects.OrderProcessed;
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
      expoPushToken: string,
    };
    seller: {
      _id: string;
      storeName: string;
      phoneNumber: string;
      address: string;
      subdistrict: string;
      city: string;
      province: string;
      postalCode: string;
      expoPushToken: string,
    };
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    status: OrderStatus;
  };
}
