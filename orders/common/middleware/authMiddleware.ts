import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

let token: any;

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req: Request, res: Response, next: NextFunction) => {
  token = req.headers.authorization!.split(' ')[1]
  const user:any = jwt.verify(token, process.env.JWT_SECRET!)
  
  if (user && user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
