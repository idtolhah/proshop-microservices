import { Message } from 'node-nats-streaming';
import { Listener, OrderShippedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

export class OrderShippedListener extends Listener<OrderShippedEvent> {
  subject: Subjects.OrderShipped = Subjects.OrderShipped;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderShippedEvent['data'], msg: Message) {

    const notification = new Notification({
      content: 'Kabar gembira! Pesanaan Anda sedang dikirim.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });
    await notification.save();

    const message = {
      to: data.user.expoPushToken,
      sound: 'default',
      title: 'Order Notification',
      body: 'Kabar gembira! Pesanaan Anda sedang dikirim.',
    }
    await sendPushNotification(message)

    msg.ack();
  }
}
