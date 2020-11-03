import { Publisher, OrderCreatedEvent, Subjects } from '@ta-shop/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
