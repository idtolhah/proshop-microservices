import { Request, Response } from 'express';
import { natsWrapper } from '../config/nats-wrapper';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel'
import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { ObjectId} from 'mongodb'

let token: any
let decoded: any

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  let sortBy = {}

  if(req.query.sort == 'Terkait')
    sortBy = { createdAt : 1 }
  if(req.query.sort == 'Terbaru')
    sortBy = { createdAt : -1 }
  if(req.query.sort == 'Terlaris')
    sortBy = { countInStock : 1 }
  if(req.query.sort == 'HargaAsc')
    sortBy = { price : 1 }
  if(req.query.sort == 'HargaDesc')
    sortBy = { price : -1 }

  let query: any = { "name": {'$regex': `${req.query.keyword}`, '$options': 'i'} }

  if(req.query.category != '' && req.query.category != undefined) {
    query = {
      $and: [
        { "name": {'$regex': `${req.query.keyword}`, '$options': 'i'} }, 
        { "category": `${req.query.category}` }
      ]
    }
  }

  const count = await Product.countDocuments(query)
  const products = await Product.find(query).sort(sortBy)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all products favorited by user
// @route   GET /api/products/favorited
// @access  Public
const getProductsFavorited = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  let sortBy = {createdAt : -1}
  
  if(req.query.productIds){
    const temp = req.query.productIds.toString().split(',');
    let productIds: any[] = []
    let count = 0
    let products: any[] = []
    
    if(temp.length > 0){
      temp.forEach(item => {
        const _id: any = new ObjectId(item)
        productIds.push({_id})
      });

      const query = { '$and' : 
        [
          { "name": {'$regex': `${req.query.keyword}`, '$options': 'i'} },
          { "$or" : productIds }
        ]
      }

      count = await Product.countDocuments(query)
      products = await Product.find(query).sort( sortBy )
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    }

    console.log('products: ' + JSON.stringify(products))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  }
})

// @desc    Fetch all my products
// @route   GET /api/products/myproducts
// @access  Public
const getMyProducts = asyncHandler(async (req: Request, res: Response) => {
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ $and: [{'user._id': decoded.id}, 
    {'status': `${req.query.status}`}
  ] })
  
  const products = await Product.find({ 
    $and: [
        { 'user._id': decoded.id }, 
        { 'status': `${req.query.status}` }
    ]})
    .sort({ 'createdAt': -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const {
    name,
    price,
    countInStock,
    description,
    // category,
    brand,
    userStore,
  } = req.body
  
  const product = new Product({
    name,
    price,
    countInStock,
    description,
    // category,
    brand,
    image: '/images/sample.jpg',
    user: { _id: decoded.id, 
      storeName: userStore.name, 
      phoneNumber: userStore.phoneNumber,
      address: userStore.address,
      subdistrict: userStore.subdistrict,
      city: userStore.city,
      province: userStore.province,
      postalCode: userStore.postalCode,
      expoPushToken: decoded.expoPushToken || 'ExponentPushToken[iII1F3OljzM6anDe0oydYG]',
    },
  })

  console.log('product: ' + product)
  
  if (product) {
    const createdProduct = await product.save()
    console.log('created product: ' + createdProduct)
    res.status(201).json(createdProduct)
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image ? image : product.image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: req.params.id,
      userId: product.user._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      status: product.status,
      __v: product.__v,
    });

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment } = req.body
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === decoded.id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: decoded.name,
      rating: Number(rating),
      comment,
      user: decoded.id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductsFavorited,
  getMyProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
