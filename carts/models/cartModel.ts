import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CartAttrs {
    userId: string,
    productId: string,
    qty: number,
}

interface CartDoc extends CartAttrs, mongoose.Document {}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true },
        productId: { type: String, required: true },
        qty: { type: Number, required: true },
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
