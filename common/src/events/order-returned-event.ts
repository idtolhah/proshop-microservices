import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderReturnedEvent {
  subject: Subjects.OrderReturned;
  data: Order;
}
