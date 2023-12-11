const jwt = require('jwt-simple')
const moment = require('moment')
const { SECRET_TOKEN } = require('../services/jwt')

exports.auth = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(403).send({ message: 'Authorization is required' })
  }

  try {
    const payload = jwt.decode(token, SECRET_TOKEN)
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' })
    }
    req.user = payload
  } catch (error) {
    return res.status(404).send({ message: 'Token is invalid' })
  }
  next()
}
