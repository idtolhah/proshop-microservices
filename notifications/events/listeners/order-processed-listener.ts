import { Message } from 'node-nats-streaming';
import { Listener, OrderProcessedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';

export class OrderProcessedListener extends Listener<OrderProcessedEvent> {
  subject: Subjects.OrderProcessed = Subjects.OrderProcessed;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderProcessedEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Pesanaan Anda sedang diproses oleh penjual.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });

    await notification.save();

    msg.ack();
  }
}
