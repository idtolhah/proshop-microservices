import express from 'express'
const router = express.Router()
import {
  getProducts,
  getMyProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController'
import { protect, admin } from '../common/middleware/authMiddleware'

router.route('/').get(getProducts).post(protect, createProduct)
router.route('/myproducts').get(protect, getMyProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)

export default router
