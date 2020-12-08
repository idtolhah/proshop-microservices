import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderReceivedEvent {
  subject: Subjects.OrderReceived;
  data: {
    id: string;
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
