import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const users = [
  {
    _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cda5a"),
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cda5b"),
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cda5c"),
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
