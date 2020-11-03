export enum OrderStatus {
  // 1. When the order has been created (Done)
  Created = 'created',
  // 2
  Cancelled = 'cancelled',
  // 3 (Done)
  Paid = 'paid',
  // 4
  Processed = 'processed',
  // 5 (Done)
  Shipped = 'shipped',
  // 6
  Received = 'received',
  // 7
  Returned = 'returned',
  // 8
  Complete = 'complete',
}
