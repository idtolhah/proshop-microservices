import { Publisher, OrderShippedEvent, Subjects } from '@ta-shop/common';

export class OrderShippedPublisher extends Publisher<OrderShippedEvent> {
  subject: Subjects.OrderShipped = Subjects.OrderShipped;
}
