const jwt = require('jwt-simple')
const moment = require('moment')

const SECRET_TOKEN = process.env.JWT_SECRET_TOKEN

const createToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.fname,
    lname: user.lname,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  }

  return jwt.encode(payload, SECRET_TOKEN)
}

module.exports = { SECRET_TOKEN, createToken }
