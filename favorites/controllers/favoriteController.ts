import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Favorite from '../models/favoriteModel'

let token: any
let decoded: any

// @desc    Fetch favorites by pagination
// @route   GET /api/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)
  
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const count = await Favorite.countDocuments({ 'userId': decoded.id })
  const data = await Favorite.find({ 'userId': decoded.id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt : -1 })

  let favorites: any[] = []
  data.forEach(item => {
    favorites.push(item.productId)
  });

  res.json({ favorites, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all favorites
// @route   GET /api/favorites/product-ids
// @access  Private
const getAllFavoriteProductIds = asyncHandler(async (req, res) => {
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const data = await Favorite.find({ 'userId': decoded.id }, {'productId':1, _id:0})
  let favorites: string[] = []
  data.forEach(item => {
    favorites.push(item.productId)
  });

  res.json({ favorites })
})

// @desc    Toggle a favorite
// @route   PUT /api/favorites/:id
// @access  Private
const toggleFavorite = asyncHandler(async (req, res) => {
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const { productId } = req.body
  
  const favorite = await Favorite.findOne({
    $and: [
      { 'userId': decoded.id }, 
      { 'productId': req.params.id }
    ]
  })

  if (favorite) {
    await favorite.remove()
    res.json({ message: 'Favorite removed' })
  } else {
    const favorite = new Favorite({
        userId: decoded.id,
        productId,
    })
    const createdFavorite = await favorite.save()
    res.status(201).json(createdFavorite)
  }
})



export {
  getFavorites,
  getAllFavoriteProductIds,
  toggleFavorite,
}
