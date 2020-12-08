import express from 'express'
const router = express.Router()
import { addCartItems, getMyCarts, updateCartItems, deleteCartItems } from '../controllers/cartController'
import { protect } from '../common/middleware/authMiddleware'

router.route('/').get(protect, getMyCarts)
router.route('/:id').post(protect, addCartItems)
router.route('/:id').put(protect, updateCartItems)
router.route('/:id').delete(protect, deleteCartItems)

export default router