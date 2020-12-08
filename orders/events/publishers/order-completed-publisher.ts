import { Publisher, OrderCompletedEvent, Subjects } from '@ta-shop/common';

export class OrderCompletedPublisher extends Publisher<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
}
