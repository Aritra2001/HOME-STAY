const express = require('express')

//controller function
const {signupUser, loginUser, forgot_password, resetPassword} = require('../controller/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//forgot password route
router.post('/forgot-password', forgot_password)

//reset password route
router.post('/reset-password/:token', resetPassword)


module.exports = router