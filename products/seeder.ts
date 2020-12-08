import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products'
import Product from './models/productModel'
import connectDB from './config/db'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany({})

    const sampleProducts = products.map((product) => {
      return { ...product, user: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cda5b") }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany({})

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
