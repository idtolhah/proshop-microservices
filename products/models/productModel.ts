import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { CategoryDoc } from './categoryModel'

// Attributes
interface ReviewAttrs {
  name: string,
  rating: number,
  comment: string,
  userId: string,
}

interface ProductAttrs {
  userId: string,
  name: string,
  image: string,
  brand: string,
  category: CategoryDoc,
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
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: { type: String, required: true },
  }
)

const productSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    brand: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    },
    description: { type: String, required: false },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    numSold: { type: Number, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'active' },
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
