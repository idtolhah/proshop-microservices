import mongoose from 'mongoose'

const storeSchema = mongoose.Schema(
  {
    user: {
        type: { 
            _id: { type: String }
        },
        required: true,
    },
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
  },
  {
    timestamps: true,
  }
)

const Store = mongoose.model('Store', storeSchema)

export default Store
