import { Publisher, ProductUpdatedEvent, Subjects } from '@ta-shop/common';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}
