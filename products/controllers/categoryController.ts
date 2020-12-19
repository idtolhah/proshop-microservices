import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel'

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1
    const count = await Category.countDocuments()
    const categories = await Category.find({}).sort( { 'title': 1 } )
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ categories, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Get top categories
// @route   GET /api/categories/top
// @access  Public
const getTopCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await Category.find({}).sort({ 'title': 1 }).limit(5)
  
    res.json(categories)
  })

export {
    getCategories,
    getTopCategories,
}