import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { OrderStatus } from '@ta-shop-simple/common';

interface OrderAttrs {
  userId: string;
  sellerId: string;
  orderItems: [
    {
      qty: number,
      price: number,
      productId: string,
    },
  ];
  shippingAddressId: string;
  paymentMethod: string;
  paymentResult: {
    id: string,
    status: string,
    update_time: string,
    email_address: string,
  };
  
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  
  isPaid: boolean;
  isDelivered: boolean;

  paidAt: Date;
  deliveredAt: Date;
  processedAt: Date;
  cancelledAt: Date;
  shippedAt: Date;
  receivedAt: Date;
  returnedAt: Date;
  completedAt: Date;
  expiresAt: number;

  receiptNumber: string;
  cancelReason: string;
  returnReason: string;
  
  status: OrderStatus;
}

interface OrderDoc extends OrderAttrs, mongoose.Document {
  _id: string
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    sellerId: { type: String, required: true },
    orderItems: { 
      type: [
        {
          qty: { type: Number, required: true },
          price: { type: Number, required: true },
          productId: { type: String, required: true },
        },
      ]
    },
    shippingAddressId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: { 
      type: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      }
    },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    
    processedAt: { type: Date },
    cancelledAt: { type: Date },
    shippedAt: { type: Date },
    receivedAt: { type: Date },
    returnedAt: { type: Date },
    completedAt: { type: Date },
    receiptNumber: { type: String },
    cancelReason: { type: String },
    returnReason: { type: String },
    
    status: { type: OrderStatus, required: false },
    expiresAt: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
)

orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs)
}
const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export default Order
