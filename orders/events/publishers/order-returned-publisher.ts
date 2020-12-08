import { Publisher, OrderReturnedEvent, Subjects } from '@ta-shop/common';

export class OrderReturnedPublisher extends Publisher<OrderReturnedEvent> {
  subject: Subjects.OrderReturned = Subjects.OrderReturned;
}
