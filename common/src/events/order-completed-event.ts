import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCompletedEvent {
  subject: Subjects.OrderCompleted;
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
    status: OrderStatus;
  };
}
