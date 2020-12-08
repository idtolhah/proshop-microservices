import express from 'express'
const router = express.Router()
import {
  getFavorites,
  getAllFavoriteProductIds,
  toggleFavorite,
} from '../controllers/favoriteController'
import { protect } from '../common/middleware/authMiddleware'

router
  .route('/').get(protect, getFavorites)
router
  .route('/product-ids').get(protect, getAllFavoriteProductIds)
router
  .route('/:id')
  .put(protect, toggleFavorite)

export default router
