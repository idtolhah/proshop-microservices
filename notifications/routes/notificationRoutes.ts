import express from 'express'
const router = express.Router()
import {
  getNotifications,
  deleteNotification,
} from '../controllers/notificationController'
import { protect } from '../common/middleware/authMiddleware'

router
  .route('/').get(protect, getNotifications)
router
  .route('/:id')
  .delete(protect, deleteNotification)

export default router
