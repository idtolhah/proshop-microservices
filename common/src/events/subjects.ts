export enum Subjects {
  // Product
  ProductCreated = 'product:created',
  ProductUpdated = 'product:updated',
  // Order
  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',
  OrderPaid = 'order:paid',
  OrderShipped = 'order:shipped',
  // Expiration
  ExpirationComplete = 'expiration:complete',
  // Payment
  PaymentCreated = 'payment:created',
}
