const express = require('express')

const { support } = require('../controller/supportController')
const router = express.Router()

//support post route
router.post('/support', support)

module.exports = router