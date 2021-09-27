import { Publisher, OrderCreatedEvent, Subjects } from '@ta-shop-simple/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
