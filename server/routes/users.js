const express = require('express')
const router = express.Router()

const {registerController, loginController, accountController, editDetailsController} = require('../controllers/users')

router.post('/signup', registerController)
router.post('/login', loginController)
router.post('/profile', accountController)
router.post('/edit/account', editDetailsController)

module.exports = router