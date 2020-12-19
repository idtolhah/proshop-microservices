import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    console.log('notification data: ' + JSON.stringify(data))
    const notification = new Notification({
      content: 'Pesanaan Anda telah dibatalkan.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });
    await notification.save();

    const notification2 = new Notification({
      content: `Pesanaan dengan Order ID: ${data.id} telah dibatalkan.`,
      user: {
        _id: data.seller._id,
      },
      link: '/order/' + data.id,
    });
    await notification2.save();

    const message = {
      to: data.seller.expoPushToken,
      sound: 'default',
      title: 'Order Notification',
      body: `Pesanaan dengan Order ID: ${data.id} telah dibatalkan.`,
    }
    await sendPushNotification(message)

    msg.ack();
  }
}
