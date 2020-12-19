import jwt from 'jsonwebtoken'

const generateToken = (id, isAdmin, name, email, expoPushToken) => {
  return jwt.sign({ id, isAdmin, name, email, expoPushToken }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken
