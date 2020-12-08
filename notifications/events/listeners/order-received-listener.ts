import { Message } from 'node-nats-streaming';
import { Listener, OrderReceivedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';

export class OrderReceivedListener extends Listener<OrderReceivedEvent> {
  subject: Subjects.OrderReceived = Subjects.OrderReceived;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderReceivedEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Pesanaan Anda sudah diterima. Mohon konfirmasi apakah barang sesuai dengan yang Anda pesan.',
      user: {
        _id: data.user._id,
      },
      link: '/order/' + data.id,
    });

    await notification.save();

    msg.ack();
  }
}
