import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Order from '../models/orderModel'
import asyncHandler from 'express-async-handler'
import { natsWrapper } from '../config/nats-wrapper';
import { OrderStatus } from '@ta-shop/common'
import { OrderPaidPublisher } from '../events/publishers/order-paid-publisher'

const midtransClient = require('midtrans-client')

let token: any
let decoded: any

// @desc    Request token to midtrans
// @route   GET /api/orders/:id/request
// @access  Private
const requestToken = asyncHandler(async (req: Request, res: Response) => {

    // token = req.headers.authorization!.split(' ')[1]
    // decoded = jwt.verify(token, process.env.JWT_SECRET!)

    const order = await Order.findById(req.params.id)

    // Create Snap API instance
    let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false, 
        serverKey : process.env.MIDTRANS_SERVER_KEY
    });

    let parameter = {
        "transaction_details": {
            "order_id": + new Date() + (order?._id ?? ''),  // first 13 digits is current timestamp
            "gross_amount": order?.totalPrice
        }, 
        "credit_card": {
            "secure" : true
        },
        "customer_details": {
            "first_name": order?.user.name,
            "last_name": "",
            "email": order?.user.email,
            "phone": order?.shippingAddress.phoneNumber,
        }
    };

    snap.createTransaction(parameter)
        .then((transaction: { token: any; })=>{
            // transaction token
            let transactionToken = transaction.token;
            res.status(200)
            res.render("midtrans.html", { transactionToken });
        })
})

// @desc    Request token to midtrans
// @route   POST /api/orders/accept
// @access  Private
const acceptPaymentUpdate = asyncHandler(async (req: Request, res: Response) => {

    const order = await Order.findById(req.body.order_id)

    if (order) {

        let status = OrderStatus.Created
        if(req.body.transaction_status === 'settlement' || req.body.transaction_status === 'capture') 
            status = OrderStatus.Paid
        
        if( req.body.transaction_status === 'cancel'
            || req.body.transaction_status === 'expire'
            || req.body.transaction_status === 'refund') status = OrderStatus.Cancelled

        order.set({
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
                id: order._id,
                status: req.body.transaction_status,
                update_time: req.body.transaction_time,
                email_address: order.user.email,
            },
            status,
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
            status,
        });
    
        res.json(updatedOrder)
        
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export { 
    requestToken,
    acceptPaymentUpdate,
}