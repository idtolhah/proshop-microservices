import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Product from '../../models/productModel';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

    data.orderItems.forEach(async item => {
      const product = await Product.findById(item.product)
      if(product){
        product.countInStock = product.countInStock - item.qty
        await product.save();
      }
    });
    msg.ack();
  }
}
