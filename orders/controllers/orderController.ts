import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'
import { natsWrapper } from '../config/nats-wrapper';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { OrderShippedPublisher } from '../events/publishers/order-shipped-publisher';
import { OrderPaidPublisher } from '../events/publishers/order-paid-publisher';
import { OrderStatus } from '@ta-shop/common';

let token: any
let decoded: any
const EXPIRATION_WINDOW_SECONDS = 1 * 60;

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {

    token = req.headers.authorization!.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_SECRET!)

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const user = {
      _id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    }

    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: OrderStatus.Created,
      expiresAt: expiration,
    })

    const createdOrder = await order.save()

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: OrderStatus.Created,
      expiresAt: expiration,
    });

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
    });

    const updatedOrder = await order.save()

    // Publish an event saying that an order was paid
    new OrderPaidPublisher(natsWrapper.client).publish({
      id: order._id,
      orderItems: order.orderItems,
      user: order.user,
      paymentMethod: order.paymentMethod,
      taxPrice: order.taxPrice,
      shippingPrice: order.shippingPrice,
      totalPrice: order.totalPrice,
      status: OrderStatus.Paid,
    });

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      isDelivered: true,
      deliveredAt: Date.now(),
      status: OrderStatus.Shipped,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was shipped
    new OrderShippedPublisher(natsWrapper.client).publish({
      id: order._id,
      user: order.user,
      shippingAddress: order.shippingAddress,
      status: OrderStatus.Shipped,
    });

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {

  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const orders = await Order.find({ 'user._id': decoded.id })
  res.json(orders)
})

// @desc    Get logged in user orders by status
// @route   GET /api/orders/myorders/:status
// @access  Private
const getMyOrdersByStatus = asyncHandler(async (req: Request, res: Response) => {

  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const orders = await Order.find({ $and: [{'user._id': decoded.id}, {'status': req.params.status}] })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({})
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getMyOrdersByStatus,
  getOrders,
}
