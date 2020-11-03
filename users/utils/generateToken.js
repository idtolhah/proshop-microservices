import jwt from 'jsonwebtoken'

const generateToken = (id, isAdmin, name, email) => {
  return jwt.sign({ id, isAdmin, name, email }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken
