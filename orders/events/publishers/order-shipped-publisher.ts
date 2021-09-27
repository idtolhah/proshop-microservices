import { Publisher, OrderShippedEvent, Subjects } from '@ta-shop-simple/common';

export class OrderShippedPublisher extends Publisher<OrderShippedEvent> {
  subject: Subjects.OrderShipped = Subjects.OrderShipped;
}
