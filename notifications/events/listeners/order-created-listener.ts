import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Selamat! Pesanaan Anda berhasil dibuat.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });

    await notification.save();

    msg.ack();
  }
}
