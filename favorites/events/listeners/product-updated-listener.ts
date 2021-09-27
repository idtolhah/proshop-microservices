import { Message } from 'node-nats-streaming';
import { Listener, ProductUpdatedEvent, Subjects } from '@ta-shop-simple/common';
import { queueGroupName } from './queue-group-name';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    // const carts = await Cart.find({'product': data.id}).sort({'createdAt': 1})
    // carts.forEach(async item => {
    //   item.name = data.name
    //   item.image = data.image
    //   item.price = data.price
    //   item.countInStock = data.countInStock
    //   const updatedCart = await item.save()
    // });
    msg.ack();
  }
}
