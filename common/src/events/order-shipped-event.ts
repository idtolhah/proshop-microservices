import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderShippedEvent {
  subject: Subjects.OrderShipped;
  data: {
    id: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    status: OrderStatus;
  };
}
