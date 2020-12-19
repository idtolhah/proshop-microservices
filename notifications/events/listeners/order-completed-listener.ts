import { Message } from 'node-nats-streaming';
import { Listener, OrderCompletedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCompletedEvent['data'], msg: Message) {
    // to Buyer
    const notification = new Notification({
      content: 'Pesanan Anda telah selesai. Dana Anda diteruskan ke penjual.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });
    await notification.save();

    const notification2 = new Notification({
      content: `Pesanan dengan Order ID: ${data.id} telah selesai. Dana dari pembeli diteruskan ke Anda.`,
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
      body: `Pesanan dengan Order ID: ${data.id} telah selesai. Dana dari pembeli diteruskan ke Anda.`,
    }
    await sendPushNotification(message)

    msg.ack();
  }
}
