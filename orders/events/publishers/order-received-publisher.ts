import { Publisher, OrderReceivedEvent, Subjects } from '@ta-shop/common';

export class OrderReceivedPublisher extends Publisher<OrderReceivedEvent> {
  subject: Subjects.OrderReceived = Subjects.OrderReceived;
}
