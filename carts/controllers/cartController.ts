import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel'

let token: any
let decoded: any

// @desc    Create new cart
// @route   POST /api/carts
// @access  Private
const addCartItems = asyncHandler(async (req: Request, res: Response) => {

    const {
        product,
        name,
        image,
        price,
        countInStock,
        qty
    } = req.body
    
    token = req.headers.authorization!.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET!)

    const user = {
        _id: decoded.id,
    }

    const existingCart = await Cart.findOne({ $and: [{'user._id': decoded.id}, {'product': product}] })

    if(existingCart){
      existingCart.qty += qty
      const updatedCart = await existingCart.save()
      res.status(204).json(updatedCart)
    }else{
      const cart = new Cart({
          user,
          product,
          name,
          image,
          price,
          countInStock,
          qty,
      })
      const createdCart = await cart.save()
      console.log('CREATED CART', createdCart)
      res.status(201).json(createdCart)
    }

    // Publish an event saying that an cart was created
    // new CartCreatedPublisher(natsWrapper.client).publish({
    //     id: cart.id,
    //     user,
    //     product,
    //     name,
    //     image,
    //     price,
    //     countInStock,
    //     qty,
    // });
})

// @desc    Get logged in user carts
// @route   GET /api/carts
// @access  Private
const getMyCarts = asyncHandler(async (req: Request, res: Response) => {
    token = req.headers.authorization!.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET!)

    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
  
    const count = await Cart.countDocuments({ 'user._id': decoded.id })
    const carts = await Cart.find({ 'user._id': decoded.id })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({carts, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Update a cart
// @route   PUT /api/carts/:id
// @access  Private/Admin
const updateCartItems = asyncHandler(async (req, res) => {
    const {
      qty
    } = req.body
  
    const cart = await Cart.findById(req.params.id)
  
    if (cart) {
      cart.qty = qty
  
      const updatedCart = await cart.save()
      res.json(updatedCart)
    } else {
      res.status(404)
      throw new Error('Cart item not found')
    }
  })

// @desc    Delete a cart
// @route   DELETE /api/carts/:id
// @access  Private/Admin
const deleteCartItems = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id)
    console.log('cart: ', cart)

    if (cart) {
      await cart.remove()
      res.json({ message: 'Cart item removed' })
    } else {
      res.status(404)
      throw new Error('Cart item not found')
    }
})

export {
    addCartItems,
    getMyCarts,
    updateCartItems,
    deleteCartItems,
}