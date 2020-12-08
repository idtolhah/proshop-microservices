import { Subjects } from './subjects';

export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
  data: {
    id: string;
    userId: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    status: string;
    __v: number;
  };
}
