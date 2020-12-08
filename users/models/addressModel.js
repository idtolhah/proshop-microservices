import mongoose from 'mongoose'

const addressSchema = mongoose.Schema(
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
    isMain: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Address = mongoose.model('Address', addressSchema)

export default Address
