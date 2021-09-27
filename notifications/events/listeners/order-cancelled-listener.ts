import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@ta-shop-simple/common';
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
      userId:  data.userId,
      link: '/order/' + data.id,
    });
    await notification.save();

    const notification2 = new Notification({
      content: `Pesanaan dengan Order ID: ${data.id} telah dibatalkan.`,
      userId: data.sellerId,
      link: '/order/' + data.id,
    });
    await notification2.save();

    // const message = {
    //   to: data.seller.expoPushToken,
    //   sound: 'default',
    //   title: 'Order Notification',
    //   body: `Pesanaan dengan Order ID: ${data.id} telah dibatalkan.`,
    // }
    // await sendPushNotification(message)

    msg.ack();
  }
}
