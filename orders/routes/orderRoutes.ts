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
  getMyStoreOrdersByStatus,
} from '../controllers/orderController'
import { 
  requestToken,
  acceptPaymentUpdate,
} from '../controllers/paymentController'
import { protect, admin } from '../common/middleware/authMiddleware'

/** ORDERS **/
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders/:status').get(protect, getMyOrdersByStatus)
router.route('/mystoreorders/:status').get(protect, getMyStoreOrdersByStatus)
router.route('/:id').get(protect, getOrderById)

router.route('/:id/process').put(protect, updateOrderToProcessed)
router.route('/:id/cancel').put(protect, updateOrderToCancelled)
router.route('/:id/deliver').put(protect, admin, updateOrderToShipped)
router.route('/:id/ship').put(protect, updateOrderToShipped)
router.route('/:id/receive').put(protect, updateOrderToReceived)
router.route('/:id/complete').put(protect, updateOrderToCompleted)
router.route('/:id/return').put(protect, updateOrderToReturned)

/** PAYMENT **/
// req & res from midtrans
router.route('/:id/request').get(requestToken)
router.route('/accept').post(acceptPaymentUpdate)
// pay
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
