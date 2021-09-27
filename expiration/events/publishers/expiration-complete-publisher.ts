import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@ta-shop-simple/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
