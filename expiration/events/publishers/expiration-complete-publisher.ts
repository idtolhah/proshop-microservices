import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@ta-shop/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
