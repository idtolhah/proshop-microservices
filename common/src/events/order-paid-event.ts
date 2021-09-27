import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderPaidEvent {
  subject: Subjects.OrderPaid;
  data: Order;
}
