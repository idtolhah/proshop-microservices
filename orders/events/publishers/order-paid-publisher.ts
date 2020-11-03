import { Publisher, OrderPaidEvent, Subjects } from '@ta-shop/common';

export class OrderPaidPublisher extends Publisher<OrderPaidEvent> {
  subject: Subjects.OrderPaid = Subjects.OrderPaid;
}
