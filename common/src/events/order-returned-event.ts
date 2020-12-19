import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderReturnedEvent {
  subject: Subjects.OrderReturned;
  data: {
    id: string;
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
