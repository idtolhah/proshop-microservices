import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from '@ta-shop-simple/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import Order from '../../models/orderModel';
import { Order as OrderType } from '../../types/order';

export class ExpirationCompleteListener extends Listener<
  ExpirationCompleteEvent
> {
  queueGroupName = queueGroupName;
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status !== OrderStatus.Created) {
      console.log('Order NOT Unpaid')
      return msg.ack();
    }

    order.set({
      cancelledAt: Date.now(),
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish(order as OrderType);

    msg.ack();
  }
}
