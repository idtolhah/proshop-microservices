import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Notification from '../models/notificationModel'

let token: any
let decoded: any

// @desc    Fetch all notifications
// @route   GET /api/notifications
// @access  Public
const getNotifications = asyncHandler(async (req, res) => {
  token = req.headers.authorization!.split(' ')[1]
  decoded = jwt.verify(token, process.env.JWT_SECRET!)
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const count = await Notification.countDocuments()
  console.log('ID: ', decoded.id)
  const notifications = await Notification.find({ 'user._id': decoded.id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ notifications, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)

  if (notification) {
    await notification.remove()
    res.json({ message: 'Notification removed' })
  } else {
    res.status(404)
    throw new Error('Notification not found')
  }
})



export {
  getNotifications,
  deleteNotification,
}
