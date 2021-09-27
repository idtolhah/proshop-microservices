import { Message } from 'node-nats-streaming';
import { Listener, OrderReturnedEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';
import sendPushNotification from '../expoPushNotification';

export class OrderReturnedListener extends Listener<OrderReturnedEvent> {
  subject: Subjects.OrderReturned = Subjects.OrderReturned;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderReturnedEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Anda melakukan pengembalian barang. Mohon kirim barang ke penjual sebelum batas waktu yang telah ditentukan.',
      userId:  data.userId,
      link: '/order/' + data.id,
    });
    await notification.save();

    const notification2 = new Notification({
      content: `Pembeli dengan Order ID: ${data.id} ingin mengajukan pengembalian barang.`,
      userId:  data.sellerId,
      link: '/order/' + data.id,
    });
    await notification2.save();

    // const message = {
    //   to: data.seller.expoPushToken,
    //   sound: 'default',
    //   title: 'Order Notification',
    //   body: `Pembeli dengan Order ID: ${data.id} ingin mengajukan pengembalian barang.`,
    // }
    // await sendPushNotification(message)

    msg.ack();
  }
}
