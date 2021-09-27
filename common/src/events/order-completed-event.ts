import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderCompletedEvent {
  subject: Subjects.OrderCompleted;
  data: Order;
}
