const jwt = require('jsonwebtoken')


const createToken = (payload) => jwt.sign(payload, 'adrian')
const verifyToken = (token) => jwt.verify(token, 'adrian')

module.exports = { createToken, verifyToken }