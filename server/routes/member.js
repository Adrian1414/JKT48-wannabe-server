const express = require('express')
const MemberController = require('../controllers/memberController')
const router = express()

router.get('/', MemberController.getAllMembers)
router.get('/:nickName', MemberController.memberProfile)



module.exports = router