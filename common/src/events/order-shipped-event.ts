import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderShippedEvent {
  subject: Subjects.OrderShipped;
  data: Order;
}
