export enum Subjects {
  // Product
  ProductCreated = 'product:created',
  ProductUpdated = 'product:updated',
  // Order
  OrderCreated = 'order:created',
  OrderPaid = 'order:paid',
  OrderProcessed = 'order:processed',
  OrderShipped = 'order:shipped',
  OrderReceived = 'order:received',
  OrderCompleted = 'order:completed',
  OrderCancelled = 'order:cancelled',
  OrderReturned = 'order:returned',
  // Expiration
  ExpirationComplete = 'expiration:complete',
  // Payment
  PaymentCreated = 'payment:created',
}
