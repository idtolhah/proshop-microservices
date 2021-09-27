import { Subjects } from './subjects';
import { Order } from './types/order';

export interface OrderReceivedEvent {
  subject: Subjects.OrderReceived;
  data: Order;
}
