import { Message } from 'node-nats-streaming';
import { Listener, OrderCompletedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCompletedEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Pesanan Anda telah selesai. Dana Anda diteruskan ke penjual.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });

    await notification.save();

    msg.ack();
  }
}
