import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Order from '../models/orderModel'
import asyncHandler from 'express-async-handler'
import { natsWrapper } from '../config/nats-wrapper';
import { OrderStatus } from '@ta-shop-simple/common'
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
    console.log('req.params: ' + JSON.stringify(req.params))
    const order = await Order.findById(req.params.id)

    // Create Snap API instance
    let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false, 
        serverKey : process.env.MIDTRANS_SERVER_KEY
    });

    let parameter = {
        "transaction_details": {
            "order_id": req.params.id,
            "gross_amount": order?.totalPrice
        }, 
        "credit_card": {
            "secure" : true
        },
        "customer_details": {
            "first_name": req.params.first_name,    // perlu dibuatkan val dari key
            "last_name": req.params.last_name,  // perlu dibuatkan val dari key
            "email": req.params.email,  // perlu dibuatkan val dari key
            "phone": req.params.phone,  // perlu dibuatkan val dari key
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

    console.log('req.body: ' + JSON.stringify(req.body))
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
                email_address: req.body.email_address, // perlu dibuatkan val dari key
            },
            status,
        });
    
        const updatedOrder = await order.save()
    
        // Publish an event saying that an order was paid
        new OrderPaidPublisher(natsWrapper.client).publish(updatedOrder);
    
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