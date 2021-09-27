import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface FavoriteAttrs {
  userId: string,
  productId: string
}

interface FavoriteDoc extends FavoriteAttrs, mongoose.Document {}

interface FavoriteModel extends mongoose.Model<FavoriteDoc> {
  build(attrs: FavoriteAttrs): FavoriteDoc;
}

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    product: { type: String, required: true }
  }
)

favoriteSchema.plugin(updateIfCurrentPlugin);
favoriteSchema.statics.build = (attrs: FavoriteAttrs) => {
  return new Favorite(attrs);
};

const Favorite = mongoose.model<FavoriteDoc, FavoriteModel>('Favorite', favoriteSchema)

export default Favorite
