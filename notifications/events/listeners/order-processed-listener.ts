import { Message } from 'node-nats-streaming';
import { Listener, OrderProcessedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

export class OrderProcessedListener extends Listener<OrderProcessedEvent> {
  subject: Subjects.OrderProcessed = Subjects.OrderProcessed;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderProcessedEvent['data'], msg: Message) {
    
    let orderItems: string = ''
    data.orderItems.forEach(item => orderItems += `${item.qty}x ${item.name} `);

    const notification = new Notification({
      content: `Pesanaan Anda sedang diproses oleh penjual. Order ID: ${data.id} (${orderItems}).`,
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
      body: `Pesanaan Anda sedang diproses oleh penjual. Order ID: ${data.id} (${orderItems}).`,
    }
    await sendPushNotification(message)

    msg.ack();
  }
}
