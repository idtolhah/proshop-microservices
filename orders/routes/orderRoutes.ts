import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getMyOrdersByStatus,
  getOrders,
  updateOrderToPaid,
  updateOrderToProcessed,
  updateOrderToShipped,
  updateOrderToReceived,
  updateOrderToCompleted,
  updateOrderToReturned,
  updateOrderToCancelled,
} from '../controllers/orderController'
import { 
  requestToken,
  acceptPaymentUpdate,
} from '../controllers/paymentController'
import { protect, admin } from '../common/middleware/authMiddleware'

// orders
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders/:status').get(protect, getMyOrdersByStatus)
router.route('/:id').get(protect, getOrderById)
// req & res from midtrans
router.route('/:id/request').get(requestToken)
router.route('/accept').post(acceptPaymentUpdate)
// payment
router.route('/:id/pay').put(protect, updateOrderToPaid)
// further...
router.route('/:id/process').put(protect, updateOrderToProcessed)
router.route('/:id/cancel').put(protect, updateOrderToCancelled)
router.route('/:id/deliver').put(protect, admin, updateOrderToShipped)
router.route('/:id/ship').put(protect, updateOrderToShipped)
router.route('/:id/receive').put(protect, updateOrderToReceived)
router.route('/:id/complete').put(protect, updateOrderToCompleted)
router.route('/:id/return').put(protect, updateOrderToReturned)

export default router
