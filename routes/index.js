// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


const home = require('./modules/home.js')
const restaurants = require('./modules/restaurants.js')
const user = require('./modules/user')
const auth = require('./modules/auth.js')
const { authenticator } = require('../middleware/auth.js')


router.use('/restaurants', authenticator, restaurants)
router.use('/users', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router