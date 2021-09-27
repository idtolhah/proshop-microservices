import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderProcessedEvent {
  subject: Subjects.OrderProcessed;
  data: Order;
}
