import express from 'express'
const router = express.Router()
import {
    getCategories,
    getTopCategories,
} from '../controllers/categoryController'

router.route('/').get(getCategories)
router.route('/top').get(getTopCategories)

export default router