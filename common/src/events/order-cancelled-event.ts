import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    orderItems: [{
      name: string;
      qty: number;
      image: string;
      price: number;
      product: string;
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      // };
    }];
    user: {
      _id: string;
      name: string;
      email: string;
    };
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    status: OrderStatus;
  };
}
