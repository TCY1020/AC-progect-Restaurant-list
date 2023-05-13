// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant.js')


router.get('/', (req, res) => {
  const sort = req.query.sort  
  Restaurant.find()
    .lean()
    .sort(`${sort}`)
    .then(restaurants => res.render('index', { restaurants, sort: sort }))
    .catch(error => console.error(error))
  console.log(`${sort}`)
})
// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
    Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.name_en.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
      )
      res.render('index', {
          restaurants: filteredRestaurants,
          keyword: req.query.keyword
        })
      
        
    })
})

module.exports = router