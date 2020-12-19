import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface SellerAttrs {
    _id: string,
    storeName: string,
    phoneNumber: string,
    address: string,
    subdistrict: string,
    city: string,
    province: string,
    postalCode: string,
    expoPushToken: string,
}

interface CartAttrs {
    user: { _id: string },
    product: string,
    name: string,
    image: string,
    price: number,
    countInStock: number,
    qty: number,
    seller: SellerAttrs,
}

interface CartDoc extends CartAttrs, mongoose.Document {}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

const sellerSchema = new mongoose.Schema(
    {
        _id: { type: String },
        storeName: { type: String },
        phoneNumber: { type: String },
        address: { type: String },
        subdistrict: { type: String },
        city: { type: String },
        province: { type: String },
        postalCode: { type: String },
        expoPushToken: { type: String },
    }
)

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: { 
                _id: { type: String, required: true }, 
            },
            required: true,
        },
        product: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: false },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        qty: { type: Number, required: true },
        seller: sellerSchema
    },
    {
        timestamps: true,
    }
)

cartSchema.plugin(updateIfCurrentPlugin);
cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema)

export default Cart
