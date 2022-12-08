const express = require('express')
const UserController = require('../controllers/userController')

const router = express()
const authentication = require('../middlewares/authentication')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');


cloudinary.config({
  cloud_name: "dqschoc1m",
  api_key: "632682329878361",
  api_secret: "ye8aEWOo7ilmDtWr7k0wUVmkEX8",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "JKT48",
  },
});

const upload = multer({ storage: storage });


router.post('/register', upload.single("profilePicture"),  UserController.register)
router.post ('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)

router.use(authentication)

router.get('/:username/oshi', UserController.getOshi)
router.get('/:username', UserController.userProfile)
router.post('/MidtransToken', UserController.midtransToken)
router.post('/:MemberId', UserController.addOneOshi)
router.patch('/status',  UserController.updateStatus)

module.exports = router