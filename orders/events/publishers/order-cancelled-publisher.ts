import { Publisher, OrderCancelledEvent, Subjects } from '@ta-shop-simple/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
