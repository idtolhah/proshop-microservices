import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';
import Cart from '../../models/cartModel';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // data.orderItems.forEach(async item => {
    //   const carts = await Cart.find({'product': item.product}).sort({'createdAt': 1})
    //   carts.forEach(async cart => {
    //     cart.countInStock += item.qty
    //     await cart.save()
    //   });
    // });
    msg.ack();
  }
}
