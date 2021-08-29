import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'
import { natsWrapper } from '../config/nats-wrapper';
import { OrderStatus } from '@ta-shop/common';
// publishers
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { OrderPaidPublisher } from '../events/publishers/order-paid-publisher';
import { OrderProcessedPublisher } from '../events/publishers/order-processed-publisher';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { OrderShippedPublisher } from '../events/publishers/order-shipped-publisher';
import { OrderReceivedPublisher } from '../events/publishers/order-received-publisher';
import { OrderCompletedPublisher } from '../events/publishers/order-completed-publisher';
import { OrderReturnedPublisher } from '../events/publishers/order-returned-publisher';

let token: any
let decoded: any
const EXPIRATION_WINDOW_SECONDS = 1 * 60;

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    seller,
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
      expoPushToken: decoded.expoPushToken || 'ExponentPushToken[iII1F3OljzM6anDe0oydYG]',
    }

    const order = new Order({
      orderItems,
      user,
      seller,
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
      id: order.id || '',
      orderItems,
      user,
      seller,
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
      },
      status: OrderStatus.Paid,
    });

    const updatedOrder = await order.save()

    // Publish an event saying that an order was paid
    new OrderPaidPublisher(natsWrapper.client).publish({
      id: order._id,
      orderItems: order.orderItems,
      user: order.user,
      seller: order.seller,
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

// @desc    Update order to processed
// @route   GET /api/orders/:id/process
// @access  Private/Admin
const updateOrderToProcessed = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      processedAt: Date.now(),
      status: OrderStatus.Processed,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was processed
    new OrderProcessedPublisher(natsWrapper.client).publish({
      id: order._id,
      orderItems: order.orderItems,
      user: order.user,
      seller: order.seller,
      paymentMethod: order.paymentMethod,
      taxPrice: order.taxPrice,
      shippingPrice: order.shippingPrice,
      totalPrice: order.totalPrice,
      status: OrderStatus.Processed,
    })

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to cancelled
// @route   GET /api/orders/:id/cancel
// @access  Private/Admin
const updateOrderToCancelled = asyncHandler(async (req: Request, res: Response) => {

  const { cancelReason } = req.body
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      cancelledAt: Date.now(),
      cancelReason,
      status: OrderStatus.Cancelled,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order._id,
      orderItems: order.orderItems,
      user: order.user,
      seller: order.seller,
      paymentMethod: order.paymentMethod,
      taxPrice: order.taxPrice,
      shippingPrice: order.shippingPrice,
      totalPrice: order.totalPrice,
      status: OrderStatus.Cancelled,
    });

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to shipped
// @route   GET /api/orders/:id/ship
// @access  Private/Admin
const updateOrderToShipped = asyncHandler(async (req: Request, res: Response) => {

  const { receiptNumber } = req.body

  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      isDelivered: true,
      deliveredAt: Date.now(),
      shippedAt: Date.now(),
      receiptNumber,
      status: OrderStatus.Shipped,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was shipped
    new OrderShippedPublisher(natsWrapper.client).publish({
      id: order._id,
      user: order.user,
      seller: order.seller,
      shippingAddress: order.shippingAddress,
      status: OrderStatus.Shipped,
    });

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to received
// @route   GET /api/orders/:id/receive
// @access  Private/Admin
const updateOrderToReceived = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      receivedAt: Date.now(),
      status: OrderStatus.Received,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was shipped
    new OrderReceivedPublisher(natsWrapper.client).publish({
      id: order._id,
      user: order.user,
      seller: order.seller,
      shippingAddress: order.shippingAddress,
      status: OrderStatus.Received,
    });

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to returned
// @route   GET /api/orders/:id/return
// @access  Private/Admin
const updateOrderToReturned = asyncHandler(async (req: Request, res: Response) => {

  const { returnReason } = req.body
  console.log('Return reason: ' + returnReason)
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      returnedAt: Date.now(),
      returnReason,
      status: OrderStatus.Returned,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was shipped
    new OrderReturnedPublisher(natsWrapper.client).publish({
      id: order._id,
      user: order.user,
      seller: order.seller,
      shippingAddress: order.shippingAddress,
      status: OrderStatus.Received,
    });

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to complete
// @route   GET /api/orders/:id/complete
// @access  Private/Admin
const updateOrderToCompleted = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.set({
      completedAt: Date.now(),
      status: OrderStatus.Completed,
    });

    const updatedOrder = await order.save()
    
    // Publish an event saying that an order was shipped
    new OrderCompletedPublisher(natsWrapper.client).publish({
      id: order._id,
      user: order.user,
      seller: order.seller,
      orderItems: order.orderItems,
      shippingAddress: order.shippingAddress,
      status: OrderStatus.Completed,
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
    .sort({ createdAt : -1 })

  res.json(orders)
})

// @desc    Get logged in user orders by status
// @route   GET /api/orders/myorders/:status
// @access  Private
const getMyOrdersByStatus = asyncHandler(async (req: Request, res: Response) => {

  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const orders = await Order.find({ $and: [{'user._id': decoded.id}, {'status': req.params.status}] })
    .sort({ createdAt : -1 })
  
  res.json(orders)
})

// @desc    Get logged in user orders by status
// @route   GET /api/orders/mystoreorders/:status
// @access  Private
const getMyStoreOrdersByStatus = asyncHandler(async (req: Request, res: Response) => {

  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const orders = await Order.find({ $and: [{'seller._id': decoded.id}, {'status': req.params.status}] })
    .sort({ createdAt : -1 })
  
  console.log('My store orders: ' + orders)
  
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
  updateOrderToProcessed,
  updateOrderToCancelled,
  updateOrderToReceived,
  updateOrderToShipped,
  updateOrderToReturned,
  updateOrderToCompleted,
  getMyOrders,
  getMyOrdersByStatus,
  getMyStoreOrdersByStatus,
  getOrders,
}
