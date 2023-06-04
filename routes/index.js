// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


const home = require('./modules/home.js')
const restaurants = require('./modules/restaurants.js')
const user = require('./modules/user')


router.use('/users', user)
router.use('/restaurants', restaurants)
router.use('/', home)

module.exports = router