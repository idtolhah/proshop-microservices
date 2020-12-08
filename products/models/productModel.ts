import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

// Attributes
interface UserAttrs {
  _id: string,
  storeName: string,
  storeAddress: string,
}

interface ReviewAttrs {
  name: string,
  rating: number,
  comment: string,
  user: UserAttrs,
}

interface ProductAttrs {
  user: UserAttrs,
  name: string,
  image: string,
  brand: string,
  category: string,
  description: string,
  reviews: [ReviewAttrs],
  rating: number,
  numReviews: number,
  numSold: number,
  price: number,
  countInStock: number,
  status: string,
}

interface ProductDoc extends ProductAttrs, mongoose.Document {
  __v: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc
}

// Schemas
const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    storeName: { type: String },
    storeAddress: { type: String },
  }
)

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: userSchema,
  }
)

const productSchema = new mongoose.Schema(
  {
    user: userSchema,
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    numSold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      default: 'active'
    },
  },
  {
    timestamps: true,
  }
)

productSchema.plugin(updateIfCurrentPlugin);
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs)
}
const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema)

export default Product
