import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface UserAttrs {
  _id: string,
  storeName: string,
  phoneNumber: string,
  address: string,
  subdistrict: string,
  city: string,
  province: string,
  postalCode: string,
}

interface ReviewAttrs {
  name: string,
  rating: number,
  comment: string,
  user: UserAttrs,
}

interface FavoriteAttrs {
  user: {
    _id: string,
    name: string,
  },
  product: {
    _id: string,
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    rating: number,
    numReviews: number,
    numSold: number,
    price: number,
    countInStock: number,
    status: string,
    user: UserAttrs,
    reviews: [ReviewAttrs],
  }
}

interface FavoriteDoc extends FavoriteAttrs, mongoose.Document {}

interface FavoriteModel extends mongoose.Model<FavoriteDoc> {
  build(attrs: FavoriteAttrs): FavoriteDoc;
}

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    storeName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    subdistrict: { type: String },
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },
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

const favoriteSchema = new mongoose.Schema(
  {
    user: { 
      type: {
        _id: { type: String },
        name: { type: String },
      },
    },
    product: {
      type: {
        _id: { type: String },
        name: { type: String },
        image: { type: String },
        brand: { type: String },
        category: { type: String },
        description: { type: String },
        rating: { type: Number },
        numReviews: { type: Number },
        numSold: { type: Number },
        price: { type: Number },
        countInStock: { type: Number },
        status: { type: String },
        user: userSchema,
        reviews: [reviewSchema],
      },
    }
  },
  {
    timestamps: true,
  }
)

favoriteSchema.plugin(updateIfCurrentPlugin);
favoriteSchema.statics.build = (attrs: FavoriteAttrs) => {
  return new Favorite(attrs);
};

const Favorite = mongoose.model<FavoriteDoc, FavoriteModel>('Favorite', favoriteSchema)

export default Favorite
