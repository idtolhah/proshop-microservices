import { Publisher, OrderPaidEvent, Subjects } from '@ta-shop-simple/common';

export class OrderPaidPublisher extends Publisher<OrderPaidEvent> {
  subject: Subjects.OrderPaid = Subjects.OrderPaid;
}
