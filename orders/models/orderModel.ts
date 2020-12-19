import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface OrderAttrs {
  user: {
    _id: string,
    name: string,
    email: string,
    expoPushToken: string,
  };
  seller: {
    _id: string,
    storeName: string,
    phoneNumber: string,
    address: string,
    subdistrict: string,
    city: string,
    province: string,
    postalCode: string,
    expoPushToken: string,
  };
  orderItems: [
    {
      name: string,
      qty: number,
      image: string,
      price: number,
      product: string,
    },
  ];
  shippingAddress: {
    name: string,
    phoneNumber: string,
    address: string,
    subdistrict: string,
    city: string,
    province: string,
    postalCode: string,
  };
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
  
  status: string;
}

interface OrderDoc extends OrderAttrs, mongoose.Document {
  _id: string
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        expoPushToken: { type: String },
      },
      required: true,
    },
    seller: {
      type: {
        _id: { type: String },
        storeName: { type: String },
        phoneNumber: { type: String },
        address: { type: String },
        subdistrict: { type: String },
        city: { type: String },
        province: { type: String },
        postalCode: { type: String },
        expoPushToken: {type: String },
      },
    },
    orderItems: {type: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: String, required: true },
      },
    ]},
    shippingAddress: { 
      type: {
        name: {
          type: String,
          required: false,
        },
        phoneNumber: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: true,
        },
        subdistrict: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        province: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: false,
        },
      }
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {type: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    }},
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    processedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    shippedAt: {
      type: Date,
    },
    receivedAt: {
      type: Date,
    },
    returnedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    receiptNumber: {
      type: String,
    },
    cancelReason: {
      type: String,
    },
    returnReason: {
      type: String,
    },
    status: {
      type: String,
      required: false,
    },
    expiresAt: {
      type: Number,
      required: false,
    },
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
