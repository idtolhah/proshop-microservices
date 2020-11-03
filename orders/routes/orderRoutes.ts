import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getMyOrdersByStatus,
  getOrders,
} from '../controllers/orderController'
import { protect, admin } from '../common/middleware/authMiddleware'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders/:status').get(protect, getMyOrdersByStatus)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
