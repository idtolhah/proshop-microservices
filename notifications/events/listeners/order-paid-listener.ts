import { Message } from 'node-nats-streaming';
import { Listener, OrderPaidEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';
import Notification from '../../models/notificationModel';

export class OrderPaidListener extends Listener<OrderPaidEvent> {
  subject: Subjects.OrderPaid = Subjects.OrderPaid;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderPaidEvent['data'], msg: Message) {
    const notification = new Notification({
      content: 'Yeah! Pembayaran Anda telah masuk.',
      userId:  data.userId,
      link: '/order/' + data.id,
    });

    await notification.save();

    msg.ack();
  }
}
