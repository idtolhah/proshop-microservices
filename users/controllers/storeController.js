import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Store from '../models/storeModel.js'

let token
let decoded

// @desc    Get user store main
// @route   GET /api/users/store
// @access  Private
const getUserStoreMain = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const store = await Store.findOne({'user._id': decoded.id})
  
    if (store) {
      res.json(store)
      res.status(200)
    } else {
      res.status(404)
      throw new Error('Store not found')
    }
})

// @desc    Add a new store
// @route   POST /api/users/store
// @access  Private
const addUserStore = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = {
        _id: decoded.id,
    }
    const { name, phoneNumber, address, subdistrict, city, province, postalCode } = req.body
  
    const storeExists = await Store.findOne({'user': user})
  
    if (storeExists) {
        res.status(400)
        throw new Error('Store already exists')
    }

    const newStore = await Store.create({
        user,
        name,
        phoneNumber,
        address,
        subdistrict,
        city,
        province,
        postalCode,
    })
  
    if (newStore) {
        res.status(201).json(newStore)
    } else {
        res.status(400)
        throw new Error('Invalid user store')
    }
})

// @desc    Get user store by id
// @route   GET /api/users/store/:id
// @access  Public
const getUserStoreById = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const store = await Store.findOne({ $and: [
        {'_id': req.params.id},
    ]})
  
    if (store) {
      res.json(store)
      res.status(200)
    } else {
      res.status(404)
      throw new Error('Store not found')
    }
})

// @desc    Update a user store
// @route   PUT /api/users/store/:id
// @access  Private
const updateUserStore = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)

    const {
      name,
      phoneNumber,
      address,
      subdistrict,
      city,
      province,
      postalCode,
    } = req.body
  
    const newStore = await Store.findOne({ $and: [
        {'user._id': decoded.id},
        {'_id': req.params.id},
    ]})
  
    if (newStore) {
      newStore.name = name
      newStore.phoneNumber = phoneNumber
      newStore.address = address
      newStore.subdistrict = subdistrict
      newStore.city = city
      newStore.province = province
      newStore.postalCode = postalCode
  
      const updatedStore = await newStore.save()
      res.json(updatedStore)
    } else {
      res.status(404)
      throw new Error('Store not found')
    }
})

export {
    getUserStoreMain,
    addUserStore,
    getUserStoreById,
    updateUserStore,
}