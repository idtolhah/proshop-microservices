import { Message } from 'node-nats-streaming';
import { Listener, OrderReturnedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';

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

    msg.ack();
  }
}
