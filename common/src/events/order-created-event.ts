import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: Order;
}
