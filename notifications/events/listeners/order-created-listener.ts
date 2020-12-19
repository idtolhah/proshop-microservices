import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

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

    let orderItems: string = ''
    data.orderItems.forEach(item => orderItems += `${item.qty}x ${item.name} `);
    const notification2 = new Notification({
      content: `Toko Anda menerima pesanan. Order ID: ${data.id} (${orderItems}).`,
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
      body: `Toko Anda menerima pesanan. Order ID: ${data.id} (${orderItems}).`,
    }
    await sendPushNotification(message)

    msg.ack();
  }
}
