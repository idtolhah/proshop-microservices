import { Publisher, OrderCancelledEvent, Subjects } from '@ta-shop/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
