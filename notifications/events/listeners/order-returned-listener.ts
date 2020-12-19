import { Message } from 'node-nats-streaming';
import { Listener, OrderReturnedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

export class OrderReturnedListener extends Listener<OrderReturnedEvent> {
  subject: Subjects.OrderReturned = Subjects.OrderReturned;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderReturnedEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Anda melakukan pengembalian barang. Mohon kirim barang ke penjual sebelum batas waktu yang telah ditentukan.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });
    await notification.save();

    const notification2 = new Notification({
      content: `Pembeli dengan Order ID: ${data.id} ingin mengajukan pengembalian barang.`,
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
      body: `Pembeli dengan Order ID: ${data.id} ingin mengajukan pengembalian barang.`,
    }
    await sendPushNotification(message)

    msg.ack();
  }
}
