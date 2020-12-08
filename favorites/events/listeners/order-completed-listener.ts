import { Message } from 'node-nats-streaming';
import { Listener, OrderCompletedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Favorite from '../../models/favoriteModel';

export class OrderCompletedListener extends Listener<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCompletedEvent['data'], msg: Message) {
    data.orderItems.forEach(async item => {
      const favorites = await Favorite.find({'product._id': item.product}).sort({'createdAt': 1})
      favorites.forEach(async item2 => {
        item2.product.numSold += item.qty
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
