import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Favorite from '../../models/favoriteModel';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    data.orderItems.forEach(async item => {
      const favorites = await Favorite.find({'product._id': item.product}).sort({'createdAt': 1})
      favorites.forEach(async item2 => {
        item2.product.countInStock += item.qty
        // const updatedFavorite = await item.save()
        const favorite = new Favorite(item2)
        if (favorite) {
          await favorite.save()
        }
      });
    });
    msg.ack();
  }
}
