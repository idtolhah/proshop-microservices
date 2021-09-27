import { Publisher, OrderReturnedEvent, Subjects } from '@ta-shop-simple/common';

export class OrderReturnedPublisher extends Publisher<OrderReturnedEvent> {
  subject: Subjects.OrderReturned = Subjects.OrderReturned;
}
