const express = require('express')
const router = express()
const user = require('./user')
const member = require('./member')

router.use('/users', user)
router.use('/members', member)

module.exports = router