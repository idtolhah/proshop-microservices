import mongoose from 'mongoose'

const User = {
  _id: String,
  name: String,
}

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: User,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
