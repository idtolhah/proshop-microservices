import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';
import Product from '../../models/productModel';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    data.orderItems.forEach(async item => {
      const product = await Product.findById(item.productId)
      if(product){
        product.countInStock = product.countInStock + item.qty
        await product.save();
      }
    });
    msg.ack();
  }
}
