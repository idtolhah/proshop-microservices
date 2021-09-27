import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';
import Cart from '../../models/cartModel';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // data.orderItems.forEach(async item => {
    //   const cart = await Cart.findOne({'product': item.product})
    //   if (cart) await cart.remove()
    // });
    msg.ack();
  }
}
