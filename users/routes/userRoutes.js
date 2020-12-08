import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import {
  getUserAddress,
  addUserAddress,
  getUserAddressById,
  getUserAddressMain,
  updateUserAddress,
  deleteUserAddress,
} from '../controllers/addressController.js'
import {
  getUserStoreMain,
  addUserStore,
  getUserStoreById,
  updateUserStore,
} from '../controllers/storeController.js'
import { protect, admin } from '../common/middleware/authMiddleware.js'

// user
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
// user address
router.route('/address')
  .post(protect, addUserAddress)
  .get(protect, getUserAddress)
router.route('/address/main')
  .get(protect, getUserAddressMain)
router.route('/address/:id')
  .get(protect, getUserAddressById)
  .put(protect, updateUserAddress)
  .delete(protect, deleteUserAddress)
// user store
router.route('/store')
  .get(protect, getUserStoreMain)
  .post(protect, addUserStore)
router.route('/store/:id')
  .get(getUserStoreById)
  .put(protect, updateUserStore)
// user
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
