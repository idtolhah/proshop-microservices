import { Publisher, OrderProcessedEvent, Subjects } from '@ta-shop-simple/common';

export class OrderProcessedPublisher extends Publisher<OrderProcessedEvent> {
  subject: Subjects.OrderProcessed = Subjects.OrderProcessed;
}
