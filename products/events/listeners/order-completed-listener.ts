import { Message } from 'node-nats-streaming';
import { Listener, OrderCompletedEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';
import Product from '../../models/productModel';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCompletedEvent['data'], msg: Message) {
    data.orderItems.forEach(async item => {
      const product = await Product.findById(item.product)
      if(product){
        product.numSold += item.qty
        await product.save();
      }
    });
    msg.ack();
  }
}
