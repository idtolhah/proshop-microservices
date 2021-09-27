import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: Order;
}
