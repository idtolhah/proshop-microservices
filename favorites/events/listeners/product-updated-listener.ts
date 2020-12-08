import { Message } from 'node-nats-streaming';
import { Listener, ProductUpdatedEvent, Subjects } from '@ta-shop/common';
import { queueGroupName } from './queue-group-name';
import Favorite from '../../models/favoriteModel';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const favorites = await Favorite.find({'product._id': data.id}).sort({'createdAt': 1})
    favorites.forEach(async item => {
      item.product.name = data.name
      item.product.image = data.image
      item.product.price = data.price
      item.product.countInStock = data.countInStock
      // const updatedFavorite = await item.save()
      const favorite = new Favorite(item)
      if (favorite) {
        const createdProduct = await favorite.save()
      }
    });
    msg.ack()
  }
}
