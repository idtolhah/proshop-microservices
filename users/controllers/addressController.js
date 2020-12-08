import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Address from '../models/addressModel.js'

let token
let decoded

// @desc    Get user address
// @route   GET /api/users/address
// @access  Private
const getUserAddress = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const address = await Address.find({ 'user._id': decoded.id })
  
    if (address) {
      res.json(address)
      res.status(200)
    } else {
      res.status(404)
      throw new Error('Address not found')
    }
})

// @desc    Get user address by id
// @route   GET /api/users/address/:id
// @access  Private
const getUserAddressById = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const address = await Address.findOne({ $and: [
        {'user._id': decoded.id},
        {'_id': req.params.id},
    ]})
  
    if (address) {
      res.json(address)
      res.status(200)
    } else {
      res.status(404)
      throw new Error('Address not found')
    }
})

// @desc    Get user address main
// @route   GET /api/users/address/main
// @access  Private
const getUserAddressMain = asyncHandler(async (req, res) => {

  token = req.headers.authorization.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET)
  
  const address = await Address.findOne({ $and: [
      {'user._id': decoded.id},
      {'isMain': true},
  ]})

  if (address) {
    res.json(address)
    res.status(200)
  } else {
    res.status(404)
    throw new Error('Address not found')
  }
})

// @desc    Add a new address
// @route   POST /api/users/address
// @access  Private
const addUserAddress = asyncHandler(async (req, res) => {

    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = {
        _id: decoded.id,
    }
    const { name, phoneNumber, address, subdistrict, city, province, postalCode } = req.body
  
    const addressExists = await Address.findOne({ $and: [
        {'user': user},
        {'name': name},
        {'phoneNumber': phoneNumber},
        {'address': address},
        {'subdistrict': province},
        {'city': city},
        {'province': province},
        {'postalCode': postalCode},
    ]})
  
    if (addressExists) {
        res.status(400)
        throw new Error('Address already exists')
    }

    const hasAddress = await Address.countDocuments({'user._id': user._id})

    let isMain = false
    if(hasAddress == 0) isMain = true

    const newAddress = await Address.create({
        user,
        name,
        phoneNumber,
        address,
        subdistrict,
        city,
        province,
        postalCode,
        isMain,
    })
  
    if (newAddress) {
        res.status(201).json(newAddress)
    } else {
        res.status(400)
        throw new Error('Invalid user address')
    }
})

// @desc    Update a user address
// @route   PUT /api/users/address/:id
// @access  Private
const updateUserAddress = asyncHandler(async (req, res) => {

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
      isMain,
    } = req.body
  
    const newAddress = await Address.findOne({ $and: [
        {'user._id': decoded.id},
        {'_id': req.params.id},
    ]})
  
    if (newAddress) {
      newAddress.name = name
      newAddress.phoneNumber = phoneNumber
      newAddress.address = address
      newAddress.subdistrict = subdistrict
      newAddress.city = city
      newAddress.province = province
      newAddress.postalCode = postalCode

      if(isMain) {
        console.log('ismain: ', isMain)
        newAddress.isMain = true
        const mainAddress = await Address.findOne({ $and: [
          {'user._id': decoded.id},
          {'isMain': true},
        ]})
        if(mainAddress){
          mainAddress.isMain = false
          await mainAddress.save()
        }
      }
  
      const updatedAddress = await newAddress.save()
      console.log('updatedAddress: ', updatedAddress)
      res.json(updatedAddress)
    } else {
      res.status(404)
      throw new Error('Address not found')
    }
  })

// @desc    Delete a user address
// @route   DELETE /api/users/address/:id
// @access  Private
const deleteUserAddress = asyncHandler(async (req, res) => {
  
    token = req.headers.authorization.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET)

    const address = await Address.findOne({ $and: [
        {'user._id': decoded.id},
        {'_id': req.params.id},
    ]})
    console.log('address', address)

    if (address) {
      if(address.isMain){
        res.status(400)
        throw new Error('Main Address can not be removed')
      }
      await address.remove()
      res.status(204)
      res.json({ message: 'Address removed' })
    } else {
      res.status(404)
      throw new Error('Address not found')
    }
})

export {
    getUserAddress,
    getUserAddressById,
    getUserAddressMain,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
}