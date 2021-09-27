import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import categories from './data/category'
import products from './data/products'
import Category from './models/categoryModel'
import Product from './models/productModel'
import connectDB from './config/db'

dotenv.config()

const importData = async () => {
  try {
    await Category.deleteMany({})
    await Product.deleteMany({})

    const sampleCategories = categories.map((category) => {
      return { ...category }
    })
    
    const sampleProducts = products.map((product) => {
      return { ...product, userId: "5f9075db7c2ac74c5d1cda5b" } 
    })

    await Category.insertMany(sampleCategories)
    console.log('Categories Imported!')

    await Product.insertMany(sampleProducts)
    console.log('Products Imported!')

    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany({})
    await Category.deleteMany({})

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

connectDB().then(() => {
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }
})
