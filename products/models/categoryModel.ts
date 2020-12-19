import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

// Attributes
interface CategoryAttrs {
    title: string,
    image: string,
}

export interface CategoryDoc extends CategoryAttrs, mongoose.Document {
}
  
interface CategoryModel extends mongoose.Model<CategoryDoc> {
    build(attrs: CategoryAttrs): CategoryDoc
}

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
})

categorySchema.plugin(updateIfCurrentPlugin);
categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs)
}
const Category = mongoose.model<CategoryDoc, CategoryModel>('Category', categorySchema)

export default Category